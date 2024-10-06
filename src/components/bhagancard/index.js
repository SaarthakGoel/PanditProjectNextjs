'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BhajanCard({ videoId , thumbnail, title , description }) {

  const router = useRouter();

  return (
    <div onClick={() => router.push(`/bhajan/${videoId}/${title}/${description}/`)} 
    className="col-span-3 flex flex-col justify-center items-center bg-orange-600 text-white p-4 rounded-lg cursor-pointer">
      <Image loading="lazy" src={thumbnail} width={480} height={360} alt="" className="rounded-md mb-2" />
      <span className="text-lg text-center font-semibold">{title}</span>
    </div>
  )
}