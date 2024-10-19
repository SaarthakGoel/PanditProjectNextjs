'use client'
import Image from "next/image";
import { pujas } from "../../../data";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slice/userData-slice";
import { useSession } from "@clerk/nextjs";
import { deleteOneCart } from "@/actions";
import Animate2 from "../animations/animation2";


export default function CartOrder ({pujaId , date , time}) {

  const dispatch = useDispatch();
  const {session} = useSession();
  const userId = session?.user?.id;
  console.log(userId)

  async function handleDelete() {
    dispatch(removeFromCart({pujaIdInt : pujaId}));
    if(userId){
      const res = await deleteOneCart(userId, pujaId);
      console.log(res.message)
    }
  }

  return (
    <Animate2 cssClass={`flex mb-6 w-full max-w-4xl`}>
    <Image
      className="rounded-l-md hidden sm:inline"
      src={pujas[pujaId].image}
      width={200}
      height={100}
      alt="hello"
    />
    <Image
      className="rounded-l-md sm:hidden"
      src={pujas[pujaId].image}
      width={100}
      height={100}
      alt="hello"
    />
    <div className="flex flex-col flex-grow bg-white rounded-r-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-orange-500 p-2 md:p-4 rounded-tr-md">
        <p className=" text-xs sm:text-lg md:text-xl font-semibold">{pujas[pujaId].puja_name}</p>
        <p className="text-xs sm:text-base md:text-lg font-semibold">Date: {date}</p>
      </div>

      {/* Description */}
      <div className="bg-gray-200 flex-grow p-1 md:p-4">
        <p className="text-[0.6rem] sm:text-xs md:text-sm">{pujas[pujaId].description}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-white p-1 md:p-4 rounded-br-md">
        <button
          onClick={handleDelete}
          className="text-red-500 text-sm sm:text-base hover:text-black hover:font-semibold"
        >
          Delete
        </button>
        <p className="text-xs sm:text-sm md:text-lg font-semibold"><span className="hidden sm:inline">Time Slot: </span>{time}</p>
        <p className="text-sm sm:text-lg md:text-2xl font-semibold text-gray-800">
          &#8377;{pujas[pujaId].price}
        </p>
      </div>
    </div>
  </Animate2>
  )
}