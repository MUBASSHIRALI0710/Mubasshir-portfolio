import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PERSONAL_INFO } from '@/data/portfolioData';

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Send real email via Resend
    if (apiKey) {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Lead <onboarding@resend.dev>',
        to: PERSONAL_INFO.email,
        replyTo: email,
        subject: `🔥 New Client Lead: ${name} — ${projectType || 'Project Inquiry'}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px; background: #ffffff;">
            <div style="border-bottom: 2px solid #FF4D00; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #0A0A0A; margin: 0; font-size: 20px;">🔥 New Client Project Inquiry</h2>
              <span style="font-size: 12px; color: #666; font-family: monospace;">From your live portfolio website</span>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px; font-weight: 500;">Client Name:</td>
                <td style="padding: 8px 0; color: #0A0A0A; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Work Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FF4D00; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Project Category:</td>
                <td style="padding: 8px 0; color: #0A0A0A; font-weight: 600;">${projectType || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Budget Target:</td>
                <td style="padding: 8px 0; color: #0A0A0A; font-weight: 600;">${budget || 'Not specified'}</td>
              </tr>
            </table>

            <div style="background-color: #FAFAF7; border: 1px solid #E8E6E1; border-radius: 8px; padding: 16px; margin-top: 15px;">
              <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #888; margin-bottom: 8px; letter-spacing: 0.05em;">Project Requirements / Message:</div>
              <div style="font-size: 14px; line-height: 1.6; color: #111; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888; display: flex; justify-content: space-between;">
              <span>Mubasshir Ali Portfolio Funnel</span>
              <a href="mailto:${email}" style="color: #FF4D00; text-decoration: none; font-weight: 600;">Click to Reply directly to ${name} →</a>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend delivery error:', error);
      } else {
        console.log('Lead notification email sent successfully:', data?.id);
      }
    } else {
      console.warn('RESEND_API_KEY is not set in environment.');
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. Mubasshir usually replies within 24 hours.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please email mubasshirali0710@gmail.com directly.' },
      { status: 500 }
    );
  }
}
