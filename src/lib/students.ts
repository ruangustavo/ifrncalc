import type { Client, InStatement } from "@libsql/client"
import { z } from "zod"

export interface AcademicProfile {
  course: string
  entryTerm: string
  currentPeriod: number
  enrollmentStatus: string
}

export const StudentIdentitySchema = z
  .object({
    user: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      email: z.string().min(1),
      campus: z.string().optional(),
      userType: z.string().optional(),
    }),
  })
  .transform(({ user }) => ({
    enrollmentId: user.id,
    name: user.name,
    email: user.email,
    campus: user.campus ?? null,
    userType: user.userType ?? null,
  }))

type StudentIdentity = z.output<typeof StudentIdentitySchema>

export interface StudentProfile extends StudentIdentity {
  academic: AcademicProfile | null
}

const ReturningIdSchema = z.object({ id: z.number() })

export async function upsertStudent(
  db: Client,
  profile: StudentProfile,
): Promise<number> {
  const now = new Date().toISOString()

  const statements: InStatement[] = [
    {
      sql: `INSERT INTO students (enrollment_id, name, email, user_type, campus, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (enrollment_id) DO UPDATE SET
              name = excluded.name,
              email = excluded.email,
              user_type = coalesce(excluded.user_type, user_type),
              campus = coalesce(excluded.campus, campus),
              updated_at = excluded.updated_at
            RETURNING id`,
      args: [
        profile.enrollmentId,
        profile.name,
        profile.email,
        profile.userType,
        profile.campus,
        now,
        now,
      ],
    },
  ]

  if (profile.academic) {
    statements.push({
      sql: `UPDATE students
            SET course = ?, entry_term = ?, current_period = ?, enrollment_status = ?
            WHERE enrollment_id = ?`,
      args: [
        profile.academic.course,
        profile.academic.entryTerm,
        profile.academic.currentPeriod,
        profile.academic.enrollmentStatus,
        profile.enrollmentId,
      ],
    })
  }

  const [upsert] = await db.batch(statements, "write")

  return ReturningIdSchema.parse(upsert?.rows[0]).id
}
