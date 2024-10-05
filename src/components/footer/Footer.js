import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-5'>
      <div className='container mx-auto flex flex-wrap justify-between px-10'>

        {/* Column 1: Logo and Brief Info */}
        <div className='w-full md:w-1/3 mb-5 md:mb-0'>
          <h2 className='text-2xl font-bold text-orange-600 mb-4'>SamsKara</h2>
          <p className='text-gray-400'>
            Bringing you a diverse range of handcrafted Puja services and consultancy. Stay connected for more updates.
          </p>
        </div>

        {/* Column 3: App Links & Social Media */}
        <div className='w-full md:w-1/3'>
          <h3 className='text-xl font-bold mb-4'>Get the App</h3>
          <div className='flex space-x-4 mb-4'>
            <a href='#'>
              <Image src='/img/homegooglePlay.svg' alt='Play Store' width={150} height={50} />
            </a>
            <a href='#'>
              <Image src='/img/homeAppStore.svg' alt='Apple Store' width={150} height={50} />
            </a>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='text-orange-600 hover:text-gray-400'>
                <FaFacebookF />
              </a>
              <a href='#' className='text-orange-600 hover:text-gray-400'>
                <FaTwitter />
              </a>
              <a href='#' className='text-orange-600 hover:text-gray-400'>
                <FaInstagram />
              </a>
              <a href='#' className='text-orange-600 hover:text-gray-400'>
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='border-t border-gray-700 mt-10 pt-5 text-center text-gray-500'>
        <p>© 2024 SamsKara. All Rights Reserved.</p>
        <p>
          <a href='#' className='hover:text-orange-600'>Privacy Policy</a> | <a href='#' className='hover:text-orange-600'>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
