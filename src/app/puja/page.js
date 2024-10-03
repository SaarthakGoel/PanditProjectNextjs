import Image from "next/image";
import { pujas } from "../../../data";
import PujaCard from "@/components/pujaCard";

export default function PujaPage() {

  return (
    <div className="bg-[#e5e5e5]">
      <div className="flex justify-around">
        <h1>Puja Services</h1>
        <input type="text" />
      </div>
      <div className="grid grid-cols-12 gap-16 px-32">
        <div className="col-span-3 bg-slate-600">
          nav
        </div>
        <div className="col-span-9 grid grid-cols-12 gap-8">
          {
            pujas.map((puja) => {
              return (
                <PujaCard item={puja} />
              )
            })
          }
        </div>
      </div>

    </div>
  )
}