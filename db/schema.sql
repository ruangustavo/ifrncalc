CREATE TABLE IF NOT EXISTS students (
  id                 INTEGER PRIMARY KEY,
  enrollment_id      TEXT NOT NULL UNIQUE,
  name               TEXT,
  email              TEXT,
  user_type          TEXT,
  campus             TEXT,
  course             TEXT,
  entry_term         TEXT,
  current_period     INTEGER,
  enrollment_status  TEXT,
  created_at         TEXT NOT NULL,
  updated_at         TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id           INTEGER PRIMARY KEY,
  student_id   INTEGER NOT NULL REFERENCES students(id),
  type         TEXT NOT NULL,
  occurred_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS events_occurred_at ON events(occurred_at);
CREATE INDEX IF NOT EXISTS events_student_id ON events(student_id, occurred_at);

CREATE TABLE IF NOT EXISTS campuses (
  code  TEXT PRIMARY KEY,
  name  TEXT NOT NULL,
  city  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS campuses_city ON campuses(city);
