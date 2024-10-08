import Midsection from '@/components/midsection/Midsection';
import connectToDB from '@/database';
import Head from 'next/head';
import Image from 'next/image';
import {auth , currentUser} from '@clerk/nextjs/server';

export default function Home() {

  const {userId} = auth();

  console.log(userId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Pandit On Demand</title>
        <meta name="description" content="Book Pandits for Puja Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-white flex justify-evenly pt-10 pb-24">
        <div className="px-6 py-16 text-center lg:py-24">
          <h1 className="text-4xl font-extrabold text-gray-800 md:text-7xl">
            Book <span className="text-orange-600">Pandits</span><br /> for Puja
            Online
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Convenient, hassle-free bookings for all your spiritual needs.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/puja"
              className="bg-orange-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-700"
            >
              Book a Pandit
            </a>
            <a
              href="#how-it-works"
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-300"
            >
              How It Works
            </a>
          </div>
        </div>

        <div className='px-3 py-6 hidden sm:block'>
          <Image src='/img/krishna.jpg' width={500} height={500} alt='landing img' />
        </div>
      </section>


      <Midsection />

      <section id="how-it-works" className="py-16 bg-white">
  <div className="container mx-auto px-6 py-20">
    <h2 className="text-3xl text-center font-bold text-gray-800">
      How It Works
    </h2>
    <p className="mt-4 text-lg text-center text-gray-600">
      Simple steps to book a Pandit for your puja.
    </p>

    <div className="mt-12 flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
      {/* Step 1 */}
      <div className="flex flex-col w-full items-center">
        <div className="bg-orange-600 text-white w-16 h-16 flex items-center justify-center rounded-full">
          1
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          Select Puja
        </h3>
        <p className="mt-2 text-gray-600">
          Choose from a wide variety of puja services for all occasions.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col w-full items-center">
        <div className="bg-orange-600 text-white w-16 h-16 flex items-center justify-center rounded-full">
          2
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          Book Pandit
        </h3>
        <p className="mt-2 text-gray-600">
          Schedule the puja by booking a qualified pandit.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col w-full items-center">
        <div className="bg-orange-600 text-white w-16 h-16 flex items-center justify-center rounded-full">
          3
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          Get Puja Done
        </h3>
        <p className="mt-2 text-gray-600">
          Our pandits will guide you through the puja with ease.
        </p>
      </div>
    </div>
  </div>
</section>    
    </div>
  );
}
