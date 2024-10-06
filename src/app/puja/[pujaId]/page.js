import Image from "next/image";
import { pujas } from "../../../../data"
import { auth } from "@clerk/nextjs/server";


export function generateStaticParams() {
  return pujas.map((item) => {
    pujaId: item.puja_id
  })
}

export default function onePuja({ params }) {

  const {userId} = auth();
  console.log(userId)

  const timeSlots = [
    "6:00 AM - 9:00 AM",
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
    "9:00 PM - 12:00 AM",
  ];

  const { pujaId } = params;

  const item = pujas[pujaId - 1];

  return (
    <div className="p-20 bg-gray-200 flex justify-center gap-16">
      <div className="">
        <div className="flex flex-col justify-center items-center rounded-md bg-white p-5 mb-5 shadow-md">
          <h1 className="text-4xl font-semibold p-4 text-orange-700">{item.puja_name}</h1>
          <p className="text-gray-500 text-md">{item.description}</p>
        </div>
        <div className="flex justify-center rounded-md bg-white py-5 shadow-lg">
          <Image className="" src={item.image} width={500} height={500} />
        </div>
      </div>



      <div className="bg-white py-10 px-20 rounded-md shadow-lg">
        {/* Price */}
        <div className="text-4xl font-semibold text-orange-700 mb-5">Price: ₹{item.price}</div>

        {/* Date Selection */}
        <div className="mb-5">
          <label className="block text-lg text-gray-600 mb-2">Select Date:</label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
            min={new Date().toISOString().split("T")[0]} // Restricting past dates
          />
        </div>

        {/* Time Selection */}
        <div className="mb-5">
          <label className="block text-lg text-gray-600 mb-2">Select Time Slot:</label>
          <select className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none">
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col py-5 gap-5">
          <a href="https://distinct-sturgeon-57.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F" className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg">
            Add to Cart
          </a>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
