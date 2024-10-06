'use client';
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function OnePage({ params }) {

  const { bhajanId } = params;

  const videoId = bhajanId[0];

  const [description, setDescription] = useState("Top Hindi Bhajans");
  const [title, setTitle] = useState("Bhajan")

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (bhajanId[2]) {
      setDescription(decodeURIComponent(bhajanId[2]));
    }
    if (bhajanId[1]) {
      setTitle(decodeURIComponent(bhajanId[1]));
    }
  }, []);

  return (
    <div className="px-20 py-10 bg-gray-200">
      <div className="flex gap-10 justify-center items-start">
        <div className="bg-white p-6 shadow-lg rounded-md">
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={800} height={450}
              controls
              playing
            />
          )}
        </div>
        <div>
          <div className="bg-white shadow-lg p-4 rounded-md">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="text-gray-500 p-6">{description}</p>
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">Add To Favourites</button>
          </div>
        </div>
      </div>
    </div>
  );
}