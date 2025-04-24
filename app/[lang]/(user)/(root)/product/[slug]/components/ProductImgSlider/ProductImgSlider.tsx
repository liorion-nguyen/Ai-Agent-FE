'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { FreeMode } from 'swiper/modules';
import Image from 'next/image';

const ImageSlider = () => {
  return (
    <div className="pl-1 bg-black">
      <Swiper
        spaceBetween={3}
        slidesPerView={2.02}
        freeMode
        modules={[FreeMode]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        // className="bg-black"
      >
        <SwiperSlide>
          <Image
            src={'/product-detail/productImgTest.png'}
            alt="this is IMG"
            width={0}
            height={0}
            style={{ width: '714px', height: '900px', objectFit: 'cover' }}
            unoptimized
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={'/product-detail/productImgTest.png'}
            alt="this is IMG"
            width={0}
            height={0}
            style={{ width: '714px', height: '900px', objectFit: 'cover' }}
            unoptimized
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={'/product-detail/productImgTest.png'}
            alt="this is IMG"
            width={0}
            height={0}
            style={{ width: '714px', height: '900px', objectFit: 'cover' }}
            unoptimized
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
