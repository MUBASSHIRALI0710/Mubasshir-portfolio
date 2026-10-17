import { ImageResponse } from 'next/og';
import { BLOG_POSTS } from '@/data/blogData';

export const runtime = 'edge';
export const alt = 'Technical Article by Mubasshir Ali';
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
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const title = post ? post.title : 'Engineering Deep Dive — Mubasshir Ali';
  const category = post ? post.category : 'Software Engineering';
  const readTime = post ? post.readTime : '5 min read';
  const publishDate = post ? post.publishDate : 'October 2026';

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
            'radial-gradient(circle at 90% 10%, rgba(255, 77, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(0, 212, 126, 0.12) 0%, transparent 50%)',
        }}
      >
        {/* Top Bar */}
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
                backgroundColor: '#FF4D00',
              }}
            />
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FAFAF7',
              }}
            >
              mubasshirali.com/blog
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 77, 0, 0.15)',
              border: '1px solid rgba(255, 77, 0, 0.3)',
              color: '#FF4D00',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {category}
          </div>
        </div>

        {/* Article Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? '48px' : '56px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '18px',
              color: '#9E9E9E',
            }}
          >
            <span>{publishDate}</span>
            <span>•</span>
            <span>{readTime}</span>
            <span>•</span>
            <span>Zero Hallucinations Guarantee</span>
          </div>
        </div>

        {/* Author Byline */}
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
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#1E1E1E',
                border: '2px solid #FF4D00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              MA
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Mubasshir Ali
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#888888',
                }}
              >
                Software Engineer • Next.js 15 &amp; AWS Bedrock
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '14px',
              fontFamily: 'monospace',
              color: '#00D47E',
            }}
          >
            Read on mubasshirali.com →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
