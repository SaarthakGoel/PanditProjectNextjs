'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneFavourite, postFavourite } from "@/actions";
import { addFavourite, removeFavourite } from "@/store/slice/userData-slice";

export default function OnePage({ params }) {

  const [isFav , setIsFav] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.userId);
  const favArr = useSelector((state) => state.userData.favourites);

  async function handleAddToFav() {
    if(isFav){
      setIsFav(false)
      setButtonText('Add to Favourites')
      setButtonClass('"bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700"')
      dispatch(removeFavourite({videoId}))
      const res = await deleteOneFavourite(userId , videoId);
      console.log(res.message);
    }else{
      setIsFav(true)
      setButtonText('Remove from Favourites')
      setButtonClass('"bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700"')
      dispatch(addFavourite({title , description , videoId , thumbnail}));
      const res = await postFavourite(userId , title , description , videoId , thumbnail);
      console.log(res.message);
    }
  }

  const { bhajanId } = params;
  const videoId = bhajanId[0];
  const thumbnail = decodeURIComponent(bhajanId[1]);

  const [description, setDescription] = useState("Top Hindi Bhajans");
  const [title, setTitle] = useState("Bhajan")
  
  const [isClient, setIsClient] = useState(false);
  const [buttonText , setButtonText] = useState('Add to Favourites')
  const [buttonClass , setButtonClass] = useState('bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700')

  useEffect(() => {
    setIsClient(true);
    if (bhajanId[3]) {
      setDescription(decodeURIComponent(bhajanId[3]));
    }
    if (bhajanId[2]) {
      setTitle(decodeURIComponent(bhajanId[2]));
    }
  }, []);

  useEffect(() => {
    if (favArr.some((fav) => fav.videoId === videoId)) {
      setIsFav(true)
      setButtonText('Remove From Favourites')
      setButtonClass('"bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700"')
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
            <button disabled={!userId} onClick={handleAddToFav} className={buttonClass}>{buttonText}</button>
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={() => router.push('/bhajan')} className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}