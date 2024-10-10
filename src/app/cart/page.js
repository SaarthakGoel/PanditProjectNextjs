'use client'
import CartOrder from "@/components/cartOrder"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { pujas } from "../../../data";

export default function CartPage() {

  const cartArr = useSelector((state) => state.userData.cart);

  let subtotal = 0;

cartArr.forEach(item => {
  subtotal += pujas[item.pujaId].price;
});

let tax = subtotal === 0 ? 0 : (subtotal*8)/100

let total = subtotal + tax

  const content1 = (
    <div className="h-[60vh] flex justify-center items-center">
      <p className="text-5xl font-semibold">Your cart is empty 🥺</p>
    </div>
  )

  const content2 = (
    <div className="grid grid-cols-12 bg-gray-200 pt-10 pb-24">
      <div className="col-span-1"></div>
      <div className=" col-span-6">
        <p className="text-5xl font-semibold pb-10">Cart</p>
        { 
          cartArr.map((item) => {
            return (
              <CartOrder pujaId={item.pujaId} date={item.date} time={item.time} />
            )
          })
        }
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-3">
  <div className="bg-white mt-20 p-6 shadow-lg rounded-lg">
    {/* Summary Header */}
    <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
      <h2 className="text-2xl font-bold">Summary</h2>
    </div>

    {/* Cart Total */}
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-600">Subtotal:</p>
        <p className="text-xl font-semibold text-gray-900">&#8377;{subtotal}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-600">GST (8%):</p>
        <p className="text-xl font-semibold text-gray-900">&#8377;{tax}</p>
      </div>
      <div className="flex justify-between items-center border-t border-gray-300 pt-4">
        <p className="text-lg text-gray-800 font-bold">Total:</p>
        <p className="text-2xl font-bold text-gray-900">&#8377;{total}</p>
      </div>
    </div>

    {/* Checkout Button */}
    <div className="mt-6">
      <button className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all duration-200">
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>
      <div className="col-span-1"></div>
    </div>
  )

  useEffect(() => {

  },[cartArr])

  return cartArr.length ? content2 : content1
}
