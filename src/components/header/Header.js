'use client'
import Image from "next/image"
import Link from "next/link"
import '../midsection/Midsection.css';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { useSelector } from "react-redux";


export default function Header() {

  const cart = useSelector((state) => state.userData.cart)

  return (
    <div className="fixed top-0 z-10 w-full bg-white">
      <div className="fixed top-6 right-8 md:top-5 lg:top-8 lg:right-16 xl:right-36">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{ elements: { userButtonAvatarBox: 'h-9 w-9 md:h-12 md:w-12' } }} />
        </SignedIn>
      </div>
      <div className="flex sm:justify-center border-b-slate-400 border-2">
        <Link href='/'><Image src='/img/navsamskara.svg' className=" h-12 w-44 my-4 md:h-20 lg:h-28 md:my-0 md:w-auto" width={250} height={100} alt='logo' /></Link>
      </div>
      <div className="bg-slate-100 py-2 drop-shadow-lg">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link className="col-span-1" href='/puja'>
            <li className="headerli text-center mx-2 sm:px-12 lg:py-2 sm:text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0 xl:px-20">
              Puja Services
            </li>
          </Link>

          <Link className="col-span-1" href='/bhajan'>
            <li className="headerli text-center mx-2 sm:px-12 lg:py-2 sm:text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0 xl:px-20">
              Bhajan Services
            </li>
          </Link>

          <Link className="col-span-1" href='/cart'>
            <li className="headerli h-full text-center mx-2 sm:px-12 lg:py-2 sm:text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0 xl:px-20">
              Cart
            </li>
          </Link>

          <Link className="col-span-1" href='/order'>
            <li className="headerli text-center mx-2 sm:px-12 lg:py-2 sm:text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0 xl:px-20">
              Order History
            </li>
          </Link>
        </ul>

      </div>
    </div>
  )
}