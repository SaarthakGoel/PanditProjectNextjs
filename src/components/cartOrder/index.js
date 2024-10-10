'use client'
import Image from "next/image";
import { pujas } from "../../../data";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slice/userData-slice";
import { useSession } from "@clerk/nextjs";
import { deleteOneCart } from "@/actions";


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
    <div className="flex mb-6 w-full max-w-4xl">
    <Image
      className="rounded-l-md"
      src={pujas[pujaId].image}
      width={200}
      height={100}
      alt=""
    />
    <div className="flex flex-col flex-grow bg-white rounded-r-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-orange-500 p-4 rounded-tr-md">
        <p className="text-xl font-semibold">{pujas[pujaId].puja_name}</p>
        <p className="text-lg font-semibold">Date: {date}</p>
      </div>

      {/* Description */}
      <div className="bg-gray-200 flex-grow p-4">
        <p className="text-sm">{pujas[pujaId].description}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-white p-4 rounded-br-md">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-black hover:font-semibold"
        >
          Delete
        </button>
        <p className="text-lg font-semibold">Time Slot: {time}</p>
        <p className="text-2xl font-semibold text-gray-800">
          &#8377;{pujas[pujaId].price}
        </p>
      </div>
    </div>
  </div>
  )
}