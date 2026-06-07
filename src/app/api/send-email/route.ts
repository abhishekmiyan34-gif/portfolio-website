import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Format the email content
    const emailContent = `
      <h2>New Website Inquiry from ${formData.name}</h2>
      <hr />
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Business:</strong> ${formData.business}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Country:</strong> ${formData.country}</p>
      <p><strong>Requirements:</strong></p>
      <p>${formData.requirements.replace(/\n/g, '<br>')}</p>
      <hr />
      <p><em>This inquiry came from your portfolio website.</em></p>
    `;

    // Log the data (for now)
    console.log('Email Data:', formData);

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
