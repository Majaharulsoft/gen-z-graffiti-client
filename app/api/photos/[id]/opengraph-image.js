import { ImageResponse } from 'next/og';

export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const post = await fetch(
    `https://dev-server.artlit.com.bd/api/photos/${params.id}`
  ).then((res) => res.json());

  console.log('hjhjk', post.image);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {post.image}
      </div>
    ),
    {
      ...size,
    }
  );
}
