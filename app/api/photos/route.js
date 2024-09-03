import { NextResponse } from "next/server";



export async function GET() {
  const response = await fetch(`https://dev-server.artlit.com.bd/api/photos`);
  // const data = await getAllPhotos();
  // console.log(response);
  return NextResponse.json(response);
}