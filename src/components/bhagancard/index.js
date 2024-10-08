'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";

export default function BhajanCard({ videoId, thumbnail, title, description }) {

  const router = useRouter();

  return (
    <div className="col-span-3 flex flex-col justify-center items-center bg-orange-600 text-white p-4 rounded-lg">
      <Image onClick={() => router.push(`/bhajan/${videoId}/${title}/${description}/`)} loading="lazy" src={thumbnail} width={480} height={360} alt="" className="rounded-md mb-2 cursor-pointer" />
      <div className="flex gap-4 justify-between">
      <span className="text-lg text-center font-semibold">{title}</span>
      <button className="z-10"><FaHeart style={{ color: 'red', fontSize: '30px' }} /></button>
      </div>
    </div>
  )
}