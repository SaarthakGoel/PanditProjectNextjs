'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import FadeIn from "../animations/animationComp";

export default function PujaCard({item}) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/puja/${item.puja_id}`)
  }

  return (
    <FadeIn cssClass={`col-span-4 flex flex-col p-6 rounded-lg bg-white`}>
      <Image loading="lazy" className="h-48" src={item.image} width={300} height={300} />
      <span className="text-xl font-bold pt-4">{item.puja_name}</span>
      <p className="text-slate-500 text-sm pt-4">{item.description}</p>
      <hr className="my-3" />
      <div className="flex justify-between">
        <span className="text-2xl font-thin" >&#8377;{item.price}</span>
        <button onClick={() => handleClick()} className="text-md px-5 py-2 bg-orange-600 rounded-full text-white  transition-all duration-300 hover:scale-95 hover:opacity-80" >Book Now</button>
      </div>
    </FadeIn>
  )
}
