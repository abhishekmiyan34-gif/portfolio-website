import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Log the data
    console.log('Form Data Received:', formData);

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully! Check your email and WhatsApp.',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
