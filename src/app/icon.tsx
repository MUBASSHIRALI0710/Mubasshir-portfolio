import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAFAF7',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '7px',
          border: '1.5px solid #262626',
        }}
      >
        <span>M</span>
        <span style={{ color: '#FF4D00', marginLeft: '0.5px' }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
