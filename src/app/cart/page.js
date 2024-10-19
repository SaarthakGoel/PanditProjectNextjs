'use client'
import CartOrder from "@/components/cartOrder"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { pujas } from "../../../data";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Animate3 from "@/components/animations/animation3";

export default function CartPage() {

  const [addressSelected, setAddressSelected] = useState(false);

  const router = useRouter();
  const addresses = useSelector((state) => state.userData.address);
  const { session } = useSession();
  const userId = session?.user?.id;

  const currUrl = encodeURIComponent('http://localhost:3000/cart/address')

  const cartArr = useSelector((state) => state.userData.cart);

  let subtotal = 0;

  cartArr.forEach(item => {
    subtotal += pujas[item.pujaId-1].price;
  });

  let tax = subtotal === 0 ? 0 : (subtotal * 8) / 100

  let total = subtotal + tax;

  function selectOrChangeAddress() {
    if (userId) {
      router.push('/cart/address')
    } else {
      router.push(`https://distinct-sturgeon-57.accounts.dev/sign-in?redirect_url=${currUrl}`)
    }
  }


  // stipe logic
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  let items = [];
  
  cartArr.map((item) => {
    items = [...items , pujas[item.pujaId]]
  })

  // Redirect to login if not logged in
  async function handleCheckout() {
    if (!userId) {
      router.replace(`https://distinct-sturgeon-57.accounts.dev/sign-in?redirect_url=${currUrl}`);
    } else {
       const res = await fetch('api/checkout' , {
        method : 'POST',
        headers : {
          'content-Type' : 'application/json',
        },
        body : JSON.stringify(items),
       });

       const {id} = await res.json();

       const stripe = await stripePromise;
       await stripe.redirectToCheckout({sessionId : id});
    }
  }

  useEffect(() => {
    addresses.map((item) => {
      if (item.selected) setAddressSelected(true)
    })
  }, [addresses])

  const content1 = (
    <div className="h-[60vh] flex justify-center items-center">
      <p className="text-5xl mx-4 font-semibold">Your cart is empty 🥺</p>
    </div>
  )

  const content2 = (
    <div className="grid grid-cols-12 bg-gray-200 pb-24">
      <div className="col-span-1"></div>
      <div className=" col-span-10 xl:col-span-6">
        <p className="text-3xl md:text-5xl py-10 font-semibold">Cart</p>
        {
          cartArr.map((item) => {
            return (
              <CartOrder key={item.pujaId} pujaId={item.pujaId} date={item.date} time={item.time} />
            )
          })
        }
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-12 xl:col-span-3 flex flex-col md:flex-row xl:flex-col justify-center items-center gap-5 md:gap-10 xl:gap-0">
        <Animate3 cssClass={`bg-white w-[60vw] md:w-[40vw] xl:w-full mt-6 sm:mt-14 md:mt-20 p-6 shadow-lg rounded-lg`}>
          {/* Summary Header */}
          <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
            <h2 className="text-xl md:text-2xl font-bold">Summary</h2>
          </div>

          {/* Cart Total */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-base md:text-lg text-gray-600">Subtotal:</p>
              <p className="text-lg md:text-xl font-semibold text-gray-900">&#8377;{subtotal}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base md:text-lg text-gray-600">GST (8%):</p>
              <p className="text-lg md:text-xl font-semibold text-gray-900">&#8377;{tax}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
              <p className="text-base md:text-lg text-gray-800 font-bold">Total:</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">&#8377;{total}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 md:mt-6">
            <button onClick={handleCheckout} className="w-full py-2 md:py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        </Animate3>
        <Animate3 cssClass={`flex flex-col xl:flex-row gap-4 justify-center items-center my-5`}>
          {
            addresses.map((item) => {
              if (item.selected === true) {
                return (
                  <div key={item.name} className="space-y-4">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all bg-orange-100 border-orange-500 shadow-md`}>
                      {/* Name of Address */}
                      <p className="font-semibold text-lg text-gray-700">
                        {item.name}
                      </p>

                      {/* Address Details */}
                      <p className="text-gray-600">{item.street}, {item.locality}</p>
                      <p className="text-gray-600">{item.city}, {item.state}</p>
                      <p className="text-gray-600">{item.postalCode}, {item.country}</p>
                      <p className="text-orange-600 mt-2 font-medium">Selected</p>
                    </div>
                  </div>
                )
              } else {
                return null
              }
            })
          }
          <button onClick={selectOrChangeAddress} className=" rounded-lg bg-orange-500 px-4 py-3 text-white font-semibold hover:bg-orange-700 transition-all">
            {addressSelected ? 'Change Address' : 'Select Address'}
          </button>
        </Animate3>
      </div>
      <div className="col-span-1"></div>
    </div>
  )

  return cartArr.length ? content2 : content1
}
