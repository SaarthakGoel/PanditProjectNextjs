'use server'
import { ytData } from "../../../../data";

export async function fetchYTdata() {
  try{
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=tophindibhajan&type=video&key=${process.env.YT_API_KEY}&maxResults=7`);
    const data = ytData
    const data = await res.json();
    return data;

  }catch(err){
    console.log(err)
  }
}


export async function fetchMoreYTdata(nextPageToken){
  try{
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=bhajan&type=video&maxResults=3&key=${process.env.YT_API_KEY}&pageToken=${nextPageToken}`);
    const data = ytData
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err);
  }
}