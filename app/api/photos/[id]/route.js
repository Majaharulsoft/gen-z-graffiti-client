import { NextResponse } from "next/server";


export async function GET(request, {params}) {
  const photoId = params?.id;
  // const data = await getPhotoById(photoId);
  const response = await fetch(
    `https://dev-server.artlit.com.bd/api/photos/${photoId}`
  );
  const data = await response.json();
  // console.log(data);

  return NextResponse.json(data);
}