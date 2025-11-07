import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.description || !body.description.trim()) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save to a database (Cloudflare D1, for example)
    // 2. Send notifications
    // 3. Validate and sanitize data
    // 4. Log for analysis
    
    // For now, we'll just log the report
    console.log('Scam Report Received:', {
      isAnonymous: body.isAnonymous,
      hasContactInfo: !body.isAnonymous && (body.name || body.email || body.phone),
      scamType: body.scamType,
      scamMethod: body.scamMethod,
      submittedAt: body.submittedAt,
      descriptionLength: body.description?.length || 0,
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true,
        message: 'Report submitted successfully',
        reportId: `RPT-${Date.now()}`, // In production, use a real ID from database
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Failed to process report' },
      { status: 500 }
    );
  }
}

