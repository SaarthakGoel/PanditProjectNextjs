import Image from "next/image"
import Link from "next/link"
import './Midsection.css';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


export default function Header() {

  return (
    <div className="fixed top-0 z-10 w-full bg-white">
      <div className="fixed top-9 right-36">
      <SignedOut>
        <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{elements : {userButtonAvatarBox : 'h-12 w-12'}}} />
        </SignedIn>
      </div>
      <div className="flex justify-center border-b-slate-400 border-2">
        <Link href='/'><Image src='/img/navsamskara.svg' className=" h-24 sm:h-28" width={350} height={100} alt='logo' /></Link>
      </div>
      <div className="bg-slate-100 py-2 drop-shadow-lg">
        <ul className="flex justify-center">
          <Link href='/puja'><li className=" headerli mx-2 px-24 py-2 text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0">Puja Services</li></Link>
          <Link href='/bhajan'><li className=" headerli mx-2 px-24 py-2 text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0">Bhajan Services</li></Link>
          <Link href='/'><li className=" headerli mx-2 px-24 py-2 text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0">Consulting Services</li></Link>
          <Link href='/'><li className=" headerli mx-2 px-24 py-2 text-lg font-semibold text-orange-600 border-2 border-x-gray-700 border-y-0">Temple Services</li></Link>
        </ul>
      </div>
    </div>
  )
}