'use client'
import { deleteOneFavourite, postFavourite } from "@/actions";
import { addFavourite, removeFavourite } from "@/store/slice/userData-slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FadeIn from "../animations/animationComp";
import Animate4 from "../animations/animate4";

export default function BhajanCard({ videoId, thumbnail, title, description }) {

  const encodedThumb = encodeURIComponent(thumbnail);

  const [favIconClass , setFavIconClass] = useState({color : 'white' , fontSize : '28px'});
  const [isFav , setIsFav] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.userData.userId)
  const favArr = useSelector((state) => state.userData.favourites)

  async function handleAddToFav(){
    if(isFav){
      setIsFav(false)
      setFavIconClass({color : 'white' , fontSize : '28px'});
      dispatch(removeFavourite({videoId}))
      const res = await deleteOneFavourite(userId , videoId);
      console.log(res.message);
    }else{
      setIsFav(true)
      setFavIconClass({color : 'red' , fontSize : '30px'})
      dispatch(addFavourite({title , description , videoId , thumbnail}));
      const res = await postFavourite(userId , title , description , videoId , thumbnail);
      console.log(res.message);
    }
  }

  function handleThumbnailClick(){
    router.push(`/bhajan/${videoId}/${encodedThumb}/${title}/${description}/`)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    if (favArr.some((fav) => fav.videoId === videoId)) {
      setIsFav(true);
      setFavIconClass({ color: 'red', fontSize: '30px' });
    }
  },[favArr]);

  return (
    <FadeIn cssClass={`col-span-3 flex flex-col justify-center items-center bg-orange-600 text-white p-4 rounded-lg`}>
      <Image src={thumbnail} onClick={handleThumbnailClick} loading="lazy"  width={480} height={360} alt="" className="rounded-md mb-2 cursor-pointer" />
      <div className="flex gap-4 justify-between">
      <span className="text-lg text-center font-semibold">{title}</span>
      <button disabled={!userId} onClick={handleAddToFav} className="disabled:opacity-50"><FaHeart style={favIconClass} /></button>
      </div>
    </FadeIn>
  )
}