'use client';

import Image from 'next/image';
import HeroImage from './../../public/hero-image.webp';
import IconArrow from './../../public/arrow.svg';
import LogoDevScale from './../../public/logodev.svg';
import { Modal } from './Modal';

export const Header = ({ children }) => {
  return (
    <header>
      <div className="hero bg-[#000017] pt-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          /> */}
          <Image src={HeroImage} alt="hero-image" />
          <div className="">
            <Image src={LogoDevScale} alt="logo" />
            <h1 className="text-5xl font-bold leading-snug tracking-wider text-white">
              {' '}
              Discover Devscale Top developer.
              <span className="text-[#81808A]">
                Connect, inspire, and build together.
              </span>
            </h1>
            <div
              className="bg-[#262736] border border-solid border-gray-500 rounded-xl p-4 mt-20  w-[80%]"
              onClick={() => document.getElementById('my_modal_4').showModal()}
            >
              <div className="flex items-center justify-between cursor-pointer overflow-hidden relative transition-all duration-300 hover:scale-x-95">
                <div className="space-y-2">
                  <div className="text-white font-semibold">
                    Submit your portfolio
                  </div>
                  <div className="font-light text-sm">
                    Get discover by all coder all around the Devscale batch
                  </div>
                </div>
                <div className="w-6">
                  <Image src={IconArrow} alt="arrow" />
                  {/* ➡️ */}
                </div>
              </div>
            </div>

            <Modal />
          </div>
        </div>
      </div>
    </header>
  );
};
