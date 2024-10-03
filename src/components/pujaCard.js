import Image from "next/image"


export default function PujaCard({item}) {

  return (
    <div className="col-span-4 flex flex-col p-6 rounded-lg bg-white">
      <Image className="h-48" src={item.image} width={300} height={300} />
      <span className="text-xl font-bold pt-4">{item.puja_name}</span>
      <p className="text-slate-500 text-sm pt-4">{item.description}</p>
      <hr className="my-3" />
      <div className="flex justify-between">
        <span className="text-2xl font-thin" >&#8377;{item.price}</span>
        <button className="text-md px-5 py-2 bg-orange-600 rounded-full text-white  transition-all duration-300 hover:scale-95 hover:opacity-80" >Book Now</button>
      </div>
    </div>
  )
}
