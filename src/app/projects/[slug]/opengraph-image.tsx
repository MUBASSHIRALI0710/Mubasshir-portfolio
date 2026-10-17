import { ImageResponse } from 'next/og';
import { PROJECTS } from '@/data/portfolioData';

export const runtime = 'edge';
export const alt = 'Architectural Case Study by Mubasshir Ali';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  const title = project ? project.title : 'Architectural Case Study — Mubasshir Ali';
  const tagline = project ? project.tagline : 'Production Full-Stack & AI Architecture';
  const stack = project ? project.stack.slice(0, 4) : ['Next.js', 'Node.js', 'TypeScript', 'AWS Bedrock'];
  const metrics = project ? project.metrics.slice(0, 3) : [];

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
            'radial-gradient(circle at 10% 10%, rgba(0, 212, 126, 0.16) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(255, 77, 0, 0.14) 0%, transparent 50%)',
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
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#00D47E',
              }}
            />
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FAFAF7',
              }}
            >
              mubasshirali.com/projects
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 212, 126, 0.15)',
              border: '1px solid rgba(0, 212, 126, 0.3)',
              color: '#00D47E',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Production Case Study
          </div>
        </div>

        {/* Center: Title & Tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#FF4D00',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Engineered by Mubasshir Ali
          </span>

          <h1
            style={{
              fontSize: title.length > 40 ? '46px' : '54px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#A0A0A0',
              lineHeight: 1.4,
              maxWidth: '900px',
              margin: 0,
            }}
          >
            {tagline}
          </p>

          {/* Metrics Pills */}
          {metrics.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '10px',
              }}
            >
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid #333333',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#00D47E',
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#888888',
                      fontFamily: 'monospace',
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Tech Stack Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #262626',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {stack.map((item) => (
              <span
                key={item}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#1E1E1E',
                  border: '1px solid #333333',
                  fontSize: '14px',
                  color: '#CCCCCC',
                  fontFamily: 'monospace',
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: '15px',
              fontFamily: 'monospace',
              color: '#FF4D00',
              fontWeight: 600,
            }}
          >
            View Architecture Specs →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
