'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneFavourite, postFavourite } from "@/actions";
import { addFavourite, removeFavourite } from "@/store/slice/userData-slice";
import Animate6 from "@/components/animations/animate6";
import Animate3 from "@/components/animations/animation3";
import './page.css';

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
      dispatch(removeFavourite({videoId}))
      const res = await deleteOneFavourite(userId , videoId);
      console.log(res.message);
    }else{
      setIsFav(true)
      setButtonText('Remove from Favourites')
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

  const [wid , setWid] = useState(window.innerWidth)

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
    }
  },[favArr]);

  return (
    <div className=" px-10 md:px-20 py-10 bg-gray-200">
      <div className="flex flex-col xl:flex-row gap-10 justify-center items-start">
        <Animate6 cssClass={`flex justify-center items-center w-full`}>
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={wid < 870 ? 600 : 700}
              height={wid < 870 ? 350 : 400}
              className=" md:h-40rem md:w-96 lg:h-full lg:w-full"
              controls
              playing
            />
          )}
        </Animate6>
        <Animate3>
          <div className="bg-white shadow-lg p-4 rounded-md">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="text-gray-500 p-6">{description}</p>
          </div>
          <div className="flex justify-center mt-10">
            <button disabled={!userId} onClick={handleAddToFav} className={isFav ? "bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700" : "bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700"}>{buttonText}</button>
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={() => router.push('/bhajan')} className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">Go Back</button>
          </div>
        </Animate3>
      </div>
    </div>
  );
}