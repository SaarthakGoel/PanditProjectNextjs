import Image from "next/image";
import { pujas } from "../../../../data"
import PujaForm from "@/components/PujaForm";

export default function onePuja({ params }) {

  const { pujaId } = params;

  const currUrl = encodeURIComponent(`http://localhost:3000/puja/${pujaId}`)

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

        <PujaForm />

        {/* Action Buttons */}
        <div className="flex flex-col py-5 gap-5">
          <a  href={`https://distinct-sturgeon-57.accounts.dev/sign-in?redirect_url=${currUrl}`} className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg">
            Add to Cart
          </a>
          <a  href={`https://distinct-sturgeon-57.accounts.dev/sign-in?redirect_url=${currUrl}`} className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full text-lg">
            CheckOut
          </a>
        </div>
      </div>
    </div>
  );
}
