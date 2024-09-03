import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Gen-z-Graffiti';
export const size = {
  width: 630,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params: { id } }) {
  // Font
   const post = await fetch(
     `https://dev-server.artlit.com.bd/api/photos/${id}`
   ).then((res) => res.json());

   console.log(post.image);

   return new ImageResponse(
     (
       // ImageResponse JSX element
       <div
         style={{
           fontSize: 12,
           background: 'white',
           width: '100%',
           height: '100%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         }}>
         <Image
           height={89}
           width={89}
           src={post.image}
           alt={'gen-z graphity'}
         />
         {'gen-z graphity'}
       </div>
     ),
     // ImageResponse options
     {
       // For convenience, we can re-use the exported opengraph-image
       // size config to also set the ImageResponse's width and height.
       ...size,
       // fonts: [
       //   {
       //     name: 'Inter',
       //     data: await interSemiBold,
       //     style: 'normal',
       //     weight: 400,
       //   },
       // ],
     }
   );
}
