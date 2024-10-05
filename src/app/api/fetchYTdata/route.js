'use server'

import { NextResponse } from "next/server";

export async function fetchYTdata() {
  try{
    //const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=13Su_JtFrYw&key=${process.env.YT_API_KEY}&part=snippet,contentDetails`);

    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=tophindibhajan&type=video&key=${process.env.YT_API_KEY}`);

    const data = await res.json();
    return data;

  }catch(err){
    console.log(err)
  }
}