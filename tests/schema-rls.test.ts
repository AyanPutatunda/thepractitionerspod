import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const migrationsDir = resolve(process.cwd(), 'supabase/migrations')
const migrationFiles = readdirSync(migrationsDir)
  .filter((name) => name.endsWith('.sql'))
  .sort()

const sql = migrationFiles
  .map((name) => readFileSync(resolve(migrationsDir, name), 'utf8'))
  .join('\n')
  .toLowerCase()

const tablePattern = /create table (?:if not exists )?public\.([a-z_]+)/g
const tables: string[] = []
let tableMatch: RegExpExecArray | null
while ((tableMatch = tablePattern.exec(sql)) !== null) {
  tables.push(tableMatch[1])
}

const pipelineStatuses = [
  'prospect',
  'invited',
  'applied',
  'shortlisted',
  'scheduled',
  'recorded',
  'editing',
  'published',
  'declined',
  'on_hold',
]

describe('supabase migrations', () => {
  it('ships an initial migration', () => {
    expect(migrationFiles.length).toBeGreaterThan(0)
    expect(tables.length).toBeGreaterThan(0)
  })

  it('enables and forces row level security on every table', () => {
    for (const table of tables) {
      expect(sql, table).toContain(`alter table public.${table} enable row level security`)
      expect(sql, table).toContain(`alter table public.${table} force row level security`)
      expect(sql, table).toContain(`on public.${table}`)
    }
  })

  it('stores staff role on profiles and the guest pipeline from the brief', () => {
    expect(sql).toContain("check (role in ('admin', 'editor', 'viewer'))")
    expect(sql).toContain('function public.profile_role()')
    expect(sql).toContain('function public.is_admin()')
    for (const status of pipelineStatuses) {
      expect(sql).toContain(`'${status}'`)
    }
  })
})
