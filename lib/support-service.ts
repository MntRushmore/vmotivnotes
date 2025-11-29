import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'
import type { SupportTicket, SupportTicketStatus } from '@/types'

const SUPPORT_STORE_PATH = path.join(process.cwd(), 'data', 'support-tickets.json')

export class SupportService {
  private static ensureStore() {
    const dir = path.dirname(SUPPORT_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (!fs.existsSync(SUPPORT_STORE_PATH)) {
      fs.writeFileSync(SUPPORT_STORE_PATH, JSON.stringify([], null, 2))
    }
  }

  private static readTickets(): SupportTicket[] {
    this.ensureStore()
    try {
      const raw = fs.readFileSync(SUPPORT_STORE_PATH, 'utf-8')
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) {
        return []
      }
      return parsed as SupportTicket[]
    } catch (error) {
      console.error('Failed to read support tickets:', error)
      return []
    }
  }

  private static writeTickets(tickets: SupportTicket[]) {
    this.ensureStore()
    fs.writeFileSync(SUPPORT_STORE_PATH, JSON.stringify(tickets, null, 2))
  }

  static async create(data: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<SupportTicket> {
    const ticket: SupportTicket = {
      id: nanoid(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const tickets = this.readTickets()
    tickets.push(ticket)
    this.writeTickets(tickets)

    return ticket
  }

  static async getAll(): Promise<SupportTicket[]> {
    const tickets = this.readTickets()
    return tickets.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  static async getById(id: string): Promise<SupportTicket | null> {
    const tickets = this.readTickets()
    return tickets.find(ticket => ticket.id === id) ?? null
  }

  static async updateStatus(id: string, status: SupportTicketStatus): Promise<SupportTicket | null> {
    const tickets = this.readTickets()
    const index = tickets.findIndex(ticket => ticket.id === id)

    if (index === -1) {
      return null
    }

    const updatedTicket: SupportTicket = {
      ...tickets[index],
      status,
      updatedAt: new Date().toISOString(),
    }

    tickets[index] = updatedTicket
    this.writeTickets(tickets)

    return updatedTicket
  }

  static async delete(id: string): Promise<boolean> {
    const tickets = this.readTickets()
    const filteredTickets = tickets.filter(ticket => ticket.id !== id)

    if (filteredTickets.length === tickets.length) {
      return false
    }

    this.writeTickets(filteredTickets)
    return true
  }
}
