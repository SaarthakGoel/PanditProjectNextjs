'use client'

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function OnePage({ params }) {
  console.log(params)

  const {bhajanId} = params;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
      {isClient && (
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${bhajanId}`} 
          controls
          playing 
        />
      )}
      <h1></h1>
      </div>
    </div>
  );
}
