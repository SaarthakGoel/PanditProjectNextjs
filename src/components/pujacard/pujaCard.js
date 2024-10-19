'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import FadeIn from "../animations/animationComp";

export default function PujaCard({ item }) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/puja/${item.puja_id}`)
  }

  return (
    <FadeIn cssClass={` col-span-11 md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center p-6 w-50vw sm:w-auto rounded-lg bg-white`}>
      <Image
        loading="lazy"
        src={item.image}
        width={300}
        height={300}
        layout="responsive"
        alt="Dynamic image"
        sizes="(max-width: 500px) 40vw"
      />
      <span className="text-xl font-bold pt-4">{item.puja_name}</span>
      <p className="text-slate-500 text-sm pt-4">{item.description}</p>
      <hr className="my-3" />
      <div className="w-full flex justify-between">
        <span className="text-2xl font-thin" >&#8377;{item.price}</span>
        <button onClick={() => handleClick()} className="text-md px-5 py-2 bg-orange-600 rounded-full text-white  transition-all duration-300 hover:scale-95 hover:opacity-80" >Book Now</button>
      </div>
    </FadeIn>
  )
}
