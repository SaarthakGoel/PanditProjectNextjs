'use client'
import { pujas } from "../../../data";
import PujaCard from "@/components/pujacard/pujaCard";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

export default function PujaPage() {

  const [currType, setCurrType] = useState("");
  const [currSearch, setCurrSearch] = useState("");

  const [pageNo, setPageNo] = useState(1);

  const pujas1 = pujas.filter((item) => item.puja_id <= 9)
  const pujas2 = pujas.filter((item) => item.puja_id >= 10 && item.puja_id <= 18)
  const pujas3 = pujas.filter((item) => item.puja_id >= 19 && item.puja_id <= 27)
  const pujas4 = pujas.filter((item) => item.puja_id >= 28)

  function handleLeft() {
    setPageNo(pageNo - 1)
    window.scrollTo({
      top: 0,     // Scroll to top
      behavior: "smooth" // For smooth scrolling
    });
  }

  function handleRigth() {
    setPageNo(pageNo + 1)
    window.scrollTo({
      top: 0,     // Scroll to top
      behavior: "smooth" // For smooth scrolling
    });
  }

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

  const content = (pujas) => {
    return (
      currType === "" ?
        pujas.map((puja) => {
          if (puja.puja_name.toLowerCase().includes(currSearch.toLowerCase())) {
            return (
                <PujaCard key={puja.puja_id} item={puja} />
            )
          } else {
            return null
          }
        }) :
        pujas.filter((puja) => puja.type === currType).map((puja) => {
          if (puja.puja_name.toLowerCase().includes(currSearch.toLowerCase())) {
            return (
                <PujaCard key={puja.puja_id} item={puja} />
            )
          } else {
            return null
          }
        })
    )
  }

  return (
    <div className="bg-[#e5e5e5] pb-24">
      <div className="flex flex-col justify-around items-center md:flex-row">
        <div>
          <h1 className="text-4xl text-orange-600 mx-6 py-10 md:m-6 ">Puja Services</h1>
        </div>
        
        <div>
          <input type="text" value={currSearch} onChange={(e) => setCurrSearch(e.target.value)} placeholder="Search" alt="search bar" className="border-[1px] border-gray-400 h-10 px-6 py-4 min-w-72 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 focus:shadow-lg max-md:min-w-72" />
          <button className="bg-white px-4 py-2 mx-2 rounded-md transition-all duration-300 text-orange-600 hover:bg-orange-600 hover:text-white ">Search</button>
        </div>
      </div>
      <div className="grid grid-cols-12 md:gap-10 lg:gap-6 xl:gap-16 px-10 xl:px-32 items-start">
        <div className=" col-span-12 md:col-span-3 py-6 px-4 bg-white border-t-8 border-orange-600 flex gap-2">
          <div>
              <Image src="/pujaListImg/7.jpg" width={50} height={50} alt="okok" />
          </div>
          <div className="flex flex-col items-start w-full">
            <span onClick={() => setCurrType("")} className="text-white text-sm font-semibold w-full rounded-md bg-orange-600 p-2 mb-6 hover:cursor-pointer">PUJA SERVICES</span>
            {
              pujaTypes.map((onetype) => {
                if (currType === onetype) {
                  return (
                    <button key={""} className="my-1 p-2 text-left md:text-sm lg:text-base  w-full rounded-md font-semibold bg-gray-200 border-[0.5px] border-orange-600 text-orange-600" onClick={() => handleTypeChange(onetype)}>{onetype}</button>
                  )
                }
                return (
                  <button key={""} className="my-1 p-2 text-left md:text-sm lg:text-base w-full rounded-md font-semibold hover:bg-gray-200 hover:border-[0.5px] border-orange-600 hover:text-orange-600" onClick={() => handleTypeChange(onetype)}>{onetype}</button>
                )
              })
            }
          </div>
        </div>
        <div className=" col-span-12 md:col-span-9 grid grid-cols-12 gap-8">
          {pageNo === 1 && content(pujas1)}
          {pageNo === 2 && content(pujas2)}
          {pageNo === 3 && content(pujas3)}
          {pageNo === 4 && content(pujas4)}
          <div className="col-span-12">
            <div className="flex justify-center items-center">
            <button className="rounded-md bg-orange-600 p-2 mr-2" disabled={pageNo === 1} onClick={handleLeft}><FaAngleDoubleLeft size={20} color="white" /></button>
            <span className={pageNo === 1 ? "bg-orange-600 text-white py-1 px-2" : "bg-white py-1 px-2 border-[1px] border-gray-500"}>1</span>
            <span className={pageNo === 2 ? "bg-orange-600 text-white py-1 px-2" : "bg-white py-1 px-2 border-[1px] border-gray-500"}>2</span>
            <span className={pageNo === 3 ? "bg-orange-600 text-white py-1 px-2" : "bg-white py-1 px-2 border-[1px] border-gray-500"}>3</span>
            <span className={pageNo === 4 ? "bg-orange-600 text-white py-1 px-2" : "bg-white py-1 px-2 border-[1px] border-gray-500"}>4</span>
            <button className="rounded-md bg-orange-600 p-2 ml-2" disabled={pageNo === 4} onClick={handleRigth}><FaAngleDoubleRight size={20} color="white" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}