'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneFavourite, postFavourite } from "@/actions";
import { addFavourite, removeFavourite } from "@/store/slice/userData-slice";
import Animate6 from "@/components/animations/animate6";
import Animate3 from "@/components/animations/animation3";

export default function OnePage({ params }) {

  const [isFav, setIsFav] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.userId);
  const favArr = useSelector((state) => state.userData.favourites);

  async function handleAddToFav() {
    if (isFav) {
      setIsFav(false)
      setButtonText('Add to Favourites')
      dispatch(removeFavourite({ videoId }))
      const res = await deleteOneFavourite(userId, videoId);
      console.log(res.message);
    } else {
      setIsFav(true)
      setButtonText('Remove from Favourites')
      dispatch(addFavourite({ title, description, videoId, thumbnail }));
      const res = await postFavourite(userId, title, description, videoId, thumbnail);
      console.log(res.message);
    }
  }

  const { bhajanId } = params;
  const videoId = bhajanId[0];

  const protocol = decodeURIComponent(bhajanId[1]);
  const host = bhajanId[3];                          
  const pathType = bhajanId[4];                     
  const abc = bhajanId[5];                       
  const xyz = bhajanId[6]; 

  const thumbnail = `${protocol}//${host}/${pathType}/${abc}/${xyz}`;
  console.log(thumbnail)

  const [description, setDescription] = useState("Top Hindi Bhajans");
  const [title, setTitle] = useState("Bhajan")

  const [isClient, setIsClient] = useState(false);
  const [buttonText, setButtonText] = useState('Add to Favourites')

  useEffect(() => {
    setIsClient(true);
    console.log(bhajanId)
    if (bhajanId[3]) {
      setDescription(decodeURIComponent(bhajanId[8]));
    }
    if (bhajanId[2]) {
      setTitle(decodeURIComponent(bhajanId[7]));
    }
  }, []);

  useEffect(() => {
    if (favArr.some((fav) => fav.videoId === videoId)) {
      setIsFav(true)
      setButtonText('Remove From Favourites')
    }
  }, [favArr]);

  return (
    <div className=" px-4 sm:px-10 md:px-20 pt-10 pb-32 bg-gray-200">
      <div className="flex flex-col xl:flex-row gap-10 justify-center items-center">
        <Animate6 cssClass={`w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[200px] sm:h-[286px] md:h-[343px] lg:h-[400px]`}>
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width="100%" // Set width to be 100% of the parent
              height="100%" // Set height to be 100% of the parent
              controls
              playing
              style={{ position: 'absolute', top: 0, left: 0 }} // Override to make player fill the container
            />
          )}
        </Animate6>
        <Animate3>
          <div className="bg-white shadow-lg p-4 rounded-md">
            <h1 className="text-2xl sm:text-4xl font-semibold">{title}</h1>
            <p className="text-gray-500 p-3 sm:p-6">{description}</p>
          </div>
          <div className="flex justify-center mt-5 sm:mt-10">
            <button disabled={!userId} onClick={handleAddToFav} className={isFav ? "bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700" : "bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700"}>{buttonText}</button>
          </div>
          <div className="flex justify-center mt-5 sm:mt-10">
            <button onClick={() => router.push('/bhajan')} className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700">Go Back</button>
          </div>
        </Animate3>
      </div>
    </div>
  );
}







        /*
        <Animate6 cssClass={`flex justify-center items-center w-full`}>
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={700}
              height={400}
              className="hidden lg:flex"
              controls
              playing
            />
          )}
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={600}
              height={343}
              className="hidden md:flex lg:hidden"
              controls
              playing
            />
          )}
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={500}
              height={286}
              className="hidden sm:flex md:hidden"
              controls
              playing
            />
          )}
          {isClient && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={350}
              height={200}
              className="sm:hidden"
              controls
              playing
            />
          )}
        </Animate6>
        */