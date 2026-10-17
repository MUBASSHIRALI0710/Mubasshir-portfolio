import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mubasshir Ali — Full-Stack & AI Systems Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#FAFAF7',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 77, 0, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 212, 126, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#FF4D00',
              }}
            />
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#FAFAF7',
              }}
            >
              mubasshirali.com
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 212, 126, 0.12)',
              border: '1px solid rgba(0, 212, 126, 0.3)',
              color: '#00D47E',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <span>●</span>
            <span>Available for Freelance (Q1 2027)</span>
          </div>
        </div>

        {/* Center H1 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#FF4D00',
            }}
          >
            Software Engineer • MERN + AI-Integrated Systems
          </span>
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Mubasshir Ali
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#A0A0A0',
              lineHeight: 1.4,
              maxWidth: '900px',
              margin: 0,
            }}
          >
            Building AI-powered SaaS tools that ship to production. Next.js 15, AWS Bedrock, LLM Agents &amp; Razorpay payment integrations.
          </p>
        </div>

        {/* Bottom Trust Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #262626',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: '16px',
              color: '#888888',
            }}
          >
            <span>Ex-AiKing Solutions</span>
            <span>•</span>
            <span>MAKAUT CSE (GPA 8.57)</span>
            <span>•</span>
            <span>200+ LeetCode DSA</span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                fontSize: '14px',
                color: '#DDDDDD',
              }}
            >
              NanoBrowser SaaS
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                fontSize: '14px',
                color: '#DDDDDD',
              }}
            >
              AI Refund Support Agent
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                fontSize: '14px',
                color: '#DDDDDD',
              }}
            >
              AWS Bedrock
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
