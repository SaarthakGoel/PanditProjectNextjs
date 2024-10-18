'use client'
import Image from "next/image";
import { pujas } from "../../../../data"
import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slice/userData-slice";
import { deleteOneCart, postCart } from "@/actions";
import Animate5 from "@/components/animations/animation5";
import Animate3 from "@/components/animations/animation3";
import Animate6 from "@/components/animations/animate6";

export default function OnePuja({ params }) {
  

  const [date, setDate] = useState("");
  const [time, setTime] = useState("6:00 AM - 9:00 AM");
  const [inCart, setInCart] = useState(false);
  const [buttonText, setButtonText] = useState('Add To Cart');


  const { session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const cartArr = useSelector((state) => state.userData.cart);


  const { pujaId } = params;
  const pujaIdInt = parseInt(pujaId)
  const item = pujas[pujaIdInt - 1];


  const timeSlots = [
    "6:00 AM - 9:00 AM",
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
    "9:00 PM - 12:00 AM",
  ];


  // Handle Add to Cart action
  async function handleAddToCart() {
    if (inCart) {
      setInCart(false);
      setButtonText('Add To Cart');
      dispatch(removeFromCart({pujaIdInt}));
      if (userId) {
        const res = await deleteOneCart(userId, pujaId);
        console.log(res.message);
      }
    } else {
      setInCart(true);
      setButtonText('Remove From Cart');
      dispatch(addToCart({ pujaIdInt , date, time }));
      if (userId) {
        const res = await postCart(userId, pujaIdInt, date, time);
        console.log(res.message);
      }
    }
  }


  // Set the initial state based on whether the item is already in the cart
  useEffect(() => {
    if (cartArr?.some((item) => item.pujaId === pujaIdInt)) {
      setInCart(true);
      setButtonText('Remove From Cart');
    } else {
      setInCart(false);
      setButtonText('Add To Cart');
    }
  }, [cartArr, pujaIdInt]);


  return (
    <div className="px-20 py-10 bg-gray-200 flex justify-center gap-16">
      <div>
        <Animate6 cssClass={`flex flex-col justify-center items-center rounded-md bg-white p-5 mb-5 shadow-md`}>
          <h1 className="text-4xl font-semibold p-4 text-orange-700">{item.puja_name}</h1>
          <p className="text-gray-500 text-md">{item.description}</p>
        </Animate6>
        <Animate5 cssClass={`flex justify-center rounded-md bg-white py-5 shadow-lg`}>
          <Image className="" src={item.image} width={500} height={500} />
        </Animate5>
      </div>

      <Animate3 cssClass={`bg-white py-10 px-20 rounded-md shadow-lg`}>
        {/* Price */}
        <div className="text-4xl font-semibold py-5 text-orange-700 mb-5">Price: ₹{item.price}</div>

        <div className="mb-5">
          <label className="block text-lg text-gray-600 mb-2">Select Date:</label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
            min={new Date().toISOString().split("T")[0]} // Restricting past dates
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-lg text-gray-600 mb-2">Select Time Slot:</label>
          <select onChange={(e) => setTime(e.target.value)} className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none">
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col py-5 gap-5">
          <button disabled={date === "" && inCart} onClick={handleAddToCart} className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg disabled:opacity-50">
            {buttonText}
          </button>
          <button onClick={() => router.push('/cart')} className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg disabled:opacity-50">
            Go to Cart
          </button>
        </div>
      </Animate3>
    </div>
  );
}

