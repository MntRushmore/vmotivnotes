import { NextResponse } from 'next/server'
import { ExportService } from '@/lib/export-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const history = await ExportService.getExportHistory()

    return NextResponse.json({
      success: true,
      data: history,
    })
  } catch (error) {
    console.error('Export history API error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve export history' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const { filePath, entry } = await ExportService.exportData()

    return NextResponse.json({
      success: true,
      filePath,
      entry,
      message: 'Data exported successfully',
    })
  } catch (error) {
    console.error('Export API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to export data'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
