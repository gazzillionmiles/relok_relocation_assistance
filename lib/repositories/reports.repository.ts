// lib/repositories/reports.repository.ts
import { createClient } from '@/lib/supabase/server'

type ReportInsert = any

export class ReportsRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async createReport(data: ReportInsert) {
    const supabase = await this.getClient()
    const { data: report, error } = await supabase
      .from('reports')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return report
  }

  async getReportsByReporter(reporterId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('reporter_id', reporterId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
