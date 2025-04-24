'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
// import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Preview = () => {
  const { t } = useTranslation('product-detail');
  return (
    <>
      {/* Preview image variant, color and variant picking */}
      <div className=" flex flex-col items-center md:gap-[8px]">
        {/* Preview Image */}
        <div className="md:w-[280px] md:h-[280px] bg-cyan-200 bg-contain bg-opacity-45"></div>
        {/* Color and variant picking */}
        <div className="md:w-[255px] md:h-[70px] flex flex-col md:gap-[4px] items-center">
          {/* Color */}
          <div className="flex md:gap-[8px] items-center">
            <p className="font-sf uppercase md:font-[500] md:text-[14px] md:leading-[20px] md:tracking-[2px] align-middle">
              {t('color')}:
            </p>
            <p className=" font-nanum md:font-[400] md:text-[22px]">Blue</p>
          </div>
          <div className="w-full flex justify-center border border-black">
            <Swiper
              spaceBetween={8}
              slidesPerView={3}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <Image
                  src={'/images/variant.png'}
                  alt="this is IMG"
                  width={40}
                  height={40}
                  unoptimized
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={'/images/variant.png'}
                  alt="this is IMG"
                  width={40}
                  height={40}
                  unoptimized
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={'/images/variant.png'}
                  alt="this is IMG"
                  width={40}
                  height={40}
                  unoptimized
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={'/images/variant.png'}
                  alt="this is IMG"
                  width={40}
                  height={40}
                  unoptimized
                />
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Variant Picking Havent finished*/}
          {/* <div className="flex gap-1 border  md:h-[46px] border-black"> */}
          {/* <Swiper
            spaceBetween={8}
            slidesPerView={3}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <Image
                src={'/images/variant.png'}
                alt="this is IMG"
                width={40}
                height={40}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={'/images/variant.png'}
                alt="this is IMG"
                width={40}
                height={40}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={'/images/variant.png'}
                alt="this is IMG"
                width={40}
                height={40}
              />
            </SwiperSlide>
          </Swiper> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Preview;
