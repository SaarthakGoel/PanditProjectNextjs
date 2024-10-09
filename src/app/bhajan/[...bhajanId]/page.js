'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

export default function OnePage({ params }) {

  const router = useRouter();

  const favArr = useSelector((state) => state.userData.favourites);

  const { bhajanId } = params;

  const videoId = bhajanId[0];

  const [description, setDescription] = useState("Top Hindi Bhajans");
  const [title, setTitle] = useState("Bhajan")
  
  const [isClient, setIsClient] = useState(false);
  const [buttonText , setButtonText] = useState('Add to Favourites')


  useEffect(() => {
    setIsClient(true);
    if (bhajanId[2]) {
      setDescription(decodeURIComponent(bhajanId[2]));
    }
    if (bhajanId[1]) {
      setTitle(decodeURIComponent(bhajanId[1]));
    }
  }, []);

  useEffect(() => {
    if (favArr.some((fav) => fav.videoId === videoId)) {
      setButtonText('Remove From Favourites')
    }
  },[favArr]);


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
            <button className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">{buttonText}</button>
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={() => router.push('/bhajan')} className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}