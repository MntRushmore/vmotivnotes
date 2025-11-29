import fs from 'fs'
import path from 'path'
import type { Teacher, TeacherStatus } from '@/types'

const TEACHER_STORE_PATH = path.join(process.cwd(), 'data', 'teachers.json')

export class TeacherService {
  private static ensureStore() {
    const dir = path.dirname(TEACHER_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (!fs.existsSync(TEACHER_STORE_PATH)) {
      fs.writeFileSync(TEACHER_STORE_PATH, JSON.stringify([], null, 2))
    }
  }

  private static readTeachers(): Teacher[] {
    this.ensureStore()
    try {
      const raw = fs.readFileSync(TEACHER_STORE_PATH, 'utf-8')
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) {
        return []
      }
      return parsed as Teacher[]
    } catch (error) {
      console.error('Failed to read teacher store:', error)
      return []
    }
  }

  private static writeTeachers(teachers: Teacher[]) {
    this.ensureStore()
    fs.writeFileSync(TEACHER_STORE_PATH, JSON.stringify(teachers, null, 2))
  }

  static async getAll(): Promise<Teacher[]> {
    const teachers = this.readTeachers()
    return teachers.sort((a, b) => a.name.localeCompare(b.name))
  }

  static async getById(id: string): Promise<Teacher | null> {
    const teachers = this.readTeachers()
    return teachers.find(teacher => teacher.id === id) ?? null
  }

  static async updateStatus(id: string, status: TeacherStatus): Promise<Teacher | null> {
    const teachers = this.readTeachers()
    const index = teachers.findIndex(teacher => teacher.id === id)

    if (index === -1) {
      return null
    }

    const timestamp = new Date().toISOString()
    const teacher = teachers[index]
    const shouldUpdateLastActive = status === 'active'

    const updatedTeacher: Teacher = {
      ...teacher,
      status,
      updatedAt: timestamp,
      lastActiveAt: shouldUpdateLastActive ? timestamp : teacher.lastActiveAt,
    }

    teachers[index] = updatedTeacher
    this.writeTeachers(teachers)

    return updatedTeacher
  }

  static async toggleStatus(id: string): Promise<Teacher | null> {
    const teacher = await this.getById(id)
    if (!teacher) {
      return null
    }

    const nextStatus: TeacherStatus = teacher.status === 'active' ? 'disabled' : 'active'
    return this.updateStatus(id, nextStatus)
  }
}
