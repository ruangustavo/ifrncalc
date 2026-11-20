import { DEMO_STUDENT } from "@/lib/suap/demo-student"

export function DemoNotice() {
  const firstName = DEMO_STUDENT.name.split(" ")[0]

  return (
    <p className="rounded-2xl bg-muted px-4 py-3 text-sm text-pretty text-muted-foreground">
      <span className="font-semibold text-foreground">Boletim de exemplo.</span>{" "}
      As notas da {firstName} são de mentira. Toca numa nota com lápis pra
      simular quanto tirar.
    </p>
  )
}
