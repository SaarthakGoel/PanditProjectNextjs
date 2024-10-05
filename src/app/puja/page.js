'use client'
import { pujas } from "../../../data";
import PujaCard from "@/components/pujacard/pujaCard";
import Image from "next/image";
import { useState } from "react";

export default function PujaPage() {

  const [currType, setCurrType] = useState("");
  const [currSearch , setCurrSearch] = useState("");

  const pujaTypes = ["Marriage",
    "Birth Related",
    "Death Rituals (Ancestral Rites)",
    "Festivities",
    "Ceremonial",
    "Business",
    "Path [Recitation]",
    "Dosha Nivaran Havan & Jaap"];

    const handleTypeChange = (onetype) => {
      setCurrType(onetype);
    }

  return (
    <div className="bg-[#e5e5e5] pb-24">
      <div className="flex justify-around items-center">
        <h1 className="text-4xl text-orange-600 m-6 py-10 ">Puja Services</h1>
        <div>
          <input type="text" value={currSearch} onChange={(e) => setCurrSearch(e.target.value)} placeholder="Search" alt="search bar" className="border-[1px] border-gray-400 h-10 px-6 py-4 min-w-72 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 focus:shadow-lg" />
          <button className="bg-white px-4 py-2 mx-2 rounded-md transition-all duration-300 text-orange-600 hover:bg-orange-600 hover:text-white ">Search</button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16 px-32 items-start">
        <div className="col-span-3 py-6 px-4 bg-white border-t-8 border-orange-600 flex gap-2">
          <div>
            <Image src="https://d2yiyjum1sxmcg.cloudfront.net/samskara/eRpRO_gabkz_mJ1xY_Durga%20Shapashati%20copy_11zon.png" width={50} height={50} alt="okok" />
          </div>
          <div className="flex flex-col items-start w-full">
            <span onClick={() => setCurrType("")} className="text-white text-sm font-semibold w-full rounded-md bg-orange-600 p-2 mb-6 hover:cursor-pointer">PUJA SERVICES</span>
            {
              pujaTypes.map((onetype) => {
                if(currType === onetype){
                  return (
                    <button key={""} className="my-1 p-2 text-left w-full rounded-md font-semibold bg-gray-200 border-[0.5px] border-orange-600 text-orange-600" onClick={() => handleTypeChange(onetype)}>{onetype}</button>
                  )
                }
                return (
                  <button key={""} className="my-1 p-2 text-left w-full rounded-md font-semibold hover:bg-gray-200 hover:border-[0.5px] border-orange-600 hover:text-orange-600" onClick={() => handleTypeChange(onetype)}>{onetype}</button>
                )
              })
            }
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-12 gap-8">
          {
            currType === "" ? 
            pujas.map((puja) => {
              if(puja.puja_name.toLowerCase().includes(currSearch.toLowerCase())){
                return (
                  <PujaCard key={puja.puja_id} item={puja} />
                )
              }else{
                return null
              }
            }) :
            pujas.filter((puja) => puja.type === currType).map((puja) => {
              if(puja.puja_name.toLowerCase().includes(currSearch.toLowerCase())){
                return (
                  <PujaCard key={puja.puja_id} item={puja} />
                )
              }else{
                return null
              }
            })
          }
        </div>
      </div>

    </div>
  )
}