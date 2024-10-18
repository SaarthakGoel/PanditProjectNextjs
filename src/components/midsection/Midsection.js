'use client'

import './Midsection.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Midsection() {

  const router = useRouter()

  function handleBhajanPageRoute(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    router.push('/bhajan')
  }

  const SlideInSectionLeft = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ref.current) {
              ref.current.classList.add('leftanimate')
            }
          } else {
            // Reset when out of view
            if (ref.current) {
              ref.current.classList.remove('leftanimate')
            }
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref} className="transform transition-all duration-500 opacity-0 lg:w-[700px] ">
        {children}
      </div>
    );
  };

  const SlideInSectionRigth = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ref.current) {
              ref.current.classList.add('rigthanimate')
            }
          } else {
            // Reset when out of view
            if (ref.current) {
              ref.current.classList.remove('rigthanimate')
            }
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref} className="transform transition-all duration-50 opacity-0 lg:w-[700px] ">
        {children}
      </div>
    );
  };

  return (
    <div>
      {/* Slide-in Section */}
      <div className='flex flex-col px-5 md:px-10 lg:px-32 justify-center items-center py-10 lg:flex-row'>
        <SlideInSectionLeft>
          <Image
            src='/img/1.gif'
            className='border-8 border-t-orange-700 border-r-gray-300 border-l-orange-700 border-b-gray-300'
            width={700}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt='card1'
          />
        </SlideInSectionLeft>
        <SlideInSectionRigth>
          <div className='px-4 lg:px-10 flex flex-col justify-center'>
            <h2 className='text-2xl lg:text-3xl font-bold text-orange-600 text-center py-5'>PUJA SERVICES</h2>
            <p className='text-center text-sm lg:text-base'>
              Sift thru the widest range of handcrafted Puja and Havan service packages tailored to meet the needs of the contemporary Indian.
            </p>
            <div className='flex justify-center pt-4'>
              <button onClick={() => router.push('/puja')} className='text-lg lg:text-xl px-5 py-2 bg-orange-600 rounded-full text-white'>Browse Collection</button>
            </div>
          </div>
        </SlideInSectionRigth>
      </div>

      {/* Second Section */}
      <div className='flex flex-col-reverse px-5 md:px-10 lg:px-32 justify-center items-center py-10 lg:flex-row'>  
        <SlideInSectionLeft>
          <div className='px-4 lg:px-10 flex flex-col justify-center'>
            <h2 className='text-2xl lg:text-3xl font-bold text-orange-600 text-center py-5'>Bhajan Services</h2>
            <p className='text-center text-sm lg:text-base'>
              Let us help you organize cultural & community activities. Choose from a spate of curated events, get great ideas for social activities including contributions to the lesser fortunate.
            </p>
            <div className='flex justify-center pt-4'>
              <button onClick={handleBhajanPageRoute} className='text-lg lg:text-xl px-5 py-2 bg-orange-600 rounded-full text-white'>Browse Collection</button>
            </div>
          </div>
        </SlideInSectionLeft>
        <SlideInSectionRigth>
          <Image
            src='/img/2.gif'
            className='border-8 border-b-orange-700 border-l-gray-300 border-r-orange-700 border-t-gray-300'
            width={700}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt='card2'
          />
        </SlideInSectionRigth>
      </div>

      {/* Third Section */}
      <div className='flex flex-col px-5 md:px-10 lg:px-32 justify-center items-center py-10 lg:flex-row'>
        <SlideInSectionLeft>
          <Image
            src='/img/3.gif'
            className='border-8 border-t-orange-700 border-r-gray-300 border-l-orange-700 border-b-gray-300'
            width={700}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt='card3'
          />
        </SlideInSectionLeft>
        <SlideInSectionRigth>
          <div className='px-4 lg:px-10 flex flex-col justify-center'>
            <h2 className='text-2xl lg:text-3xl font-bold text-orange-600 text-center py-5'>CONSULTANCY SERVICES</h2>
            <p className='text-center text-sm lg:text-base'>
              Book time with professional practitioners on diversified topics ranging from Yoga & Meditation, Vedic Astrology, Horoscope creation to Ayurvedic healing & Vastu.
            </p>
            <div className='flex justify-center pt-4'>
              <button className='text-lg lg:text-xl px-5 py-2 bg-orange-600 rounded-full text-white'>Coming Soon</button>
            </div>
          </div>
        </SlideInSectionRigth>
      </div>

      {/* Fourth Section */}
      <div className='flex flex-col-reverse px-5 md:px-10 lg:px-32 justify-center items-center py-10 lg:flex-row'>
        <SlideInSectionLeft>
          <div className='px-4 lg:px-10 flex flex-col justify-center'>
            <h2 className='text-2xl lg:text-3xl font-bold text-orange-600 text-center py-5'>TEMPLE SERVICES</h2>
            <p className='text-center text-sm lg:text-base'>Manokamna Darshan Daan</p>
            <div className='flex justify-center pt-4'>
              <button className='text-lg lg:text-xl px-5 py-2 bg-orange-600 rounded-full text-white'>Coming Soon</button>
            </div>
          </div>
        </SlideInSectionLeft>
        <SlideInSectionRigth>
          <Image
            src='/img/4.gif'
            className='border-8 border-b-orange-700 border-l-gray-300 border-r-orange-700 border-t-gray-300'
            width={700}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt='card4'
          />
        </SlideInSectionRigth>
      </div>
    </div>
  );
};