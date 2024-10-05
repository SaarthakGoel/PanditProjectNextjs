import Image from "next/image";


export default function BhajanCard({ thumbnail, title }) {
  return (
    <div className="col-span-3 flex flex-col justify-center items-center bg-orange-600 text-white p-4 rounded-lg">
      <Image loading="lazy" src={thumbnail} width={480} height={360} alt="" className="rounded-md mb-2" />
      <span className="text-lg text-center font-semibold">{title}</span>
    </div>
  )
}