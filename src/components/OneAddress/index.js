'use client'

import { removeAddress, setSelected } from "@/store/slice/userData-slice";
import { deleteAddress, saveSelected} from "@/actions";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function OneAddress() {

  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const addArr = useSelector((state) => state.userData.address);
  const {session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  function handleSelect(name) {
    setSelectedAddress(name);
  }

  async function handleAddressDelete(name) {
    dispatch(removeAddress({name}));
    const res = await deleteAddress({userId , name});
    console.log(res.message)
  }

  async function handleSelectAddress(){
    dispatch(setSelected({selectedAddress}));
    const res = await saveSelected({userId , selectedAddress})
    console.log(res.message)
    router.push('/cart')
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 sm:bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Select an Address
      </h2>

      <div className="grid grid-cols-12">
        {addArr.map((address) => (
          <div key={address.name}
            className={`p-4 m-2 col-span-6 border rounded-lg cursor-pointer transition-all ${
              selectedAddress === address.name
                ? "bg-orange-100 border-orange-500 shadow-md"
                : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleSelect(address.name)}
          >
            {console.log(address)/* Name of Address */}
            <p className="font-semibold text-lg text-gray-700">
              {address.name}
            </p>

            {/* Address Details */}
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">{address.city}, {address.state}</p>
            <p className="text-gray-600">{address.postalCode}, {address.country}</p>

            <p onClick={() => handleAddressDelete(address.name)} className="text-red-500 text-lg font-semibold hover:text-black">Delete</p>

            {/* Selection Indicator */}
            {selectedAddress === address.name ? (
              <p className="text-orange-600 mt-2 font-medium">Selected</p>
            ) : null}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          className={`px-6 py-2 text-white rounded-lg font-semibold transition duration-200 ${
            selectedAddress !== null
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={selectedAddress === null}
          onClick={handleSelectAddress}
        >
          Confirm Address
        </button>
      </div>
    </div>
  );
}