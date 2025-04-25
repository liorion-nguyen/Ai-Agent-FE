'use client';

import Img from '@/components/ui/Image';
import Link from 'next/link';

const ProductExtraInfo = () => {
  return (
    <div className="flex justify-center md:gap-[32px] md:mt-[24px]">
      <div className="flex justify-center md:gap-[16px] md:w-[421px]">
        <Img
          src="/images/product-extra-tag-1.png"
          alt="This is extra tag info 1"
          className="row-span-2 md:w-[98.13px] md:h-[85.2px] self-center"
        />
        <div className="flex flex-col align-middle gap-1">
          <p className="font-bangers md:font-[400] md:text-[32px] uppercase text-[#FFED37] stroke-slate-100">
            MACHINE WASHABLE
          </p>
          <p className="font-sf md:font-[400] md:text-[16px] md:leading-[24px] md:tracking-[0.5px] ">
            Toss in the wash with cold water. Air dry. Boom.
          </p>
        </div>
      </div>

      <div className="flex justify-center md:gap-[16px] md:w-[421px]">
        <Img
          src="/images/product-extra-tag-2.png"
          alt="This is extra tag info 2"
          className="row-span-2 md:w-[98.13px] md:h-[85.2px] self-center"
        />
        <div className="flex flex-col align-middle gap-1">
          <p className="font-bangers md:font-[400] md:text-[32px] uppercase text-[#FFED37] stroke-slate-100">
            PILLOW-LIKE COMFORT
          </p>
          <p className="font-sf md:font-[400] md:text-[16px] md:leading-[24px] md:tracking-[0.5px] ">
            Features a soft, plush footbed for easy-to- wear comfort.
          </p>
        </div>
      </div>

      <div className="flex justify-center md:gap-[16px] md:w-[421px]">
        <Img
          src="/images/product-extra-tag-3.png"
          alt="This is extra tag info 3"
          className="row-span-2 md:w-[98.13px] md:h-[85.2px] self-center"
        />
        <div className="flex flex-col align-middle gap-1">
          <p className="font-bangers md:font-[400] md:text-[32px] uppercase text-[#FFED37] stroke-slate-100">
            Friendly material
          </p>
          <p className="font-sf md:font-[400] md:text-[16px] md:leading-[24px] md:tracking-[0.5px] ">
            It took about 6 plastic bottles to knit these shoes.{' '}
            <Link href={'#'} className="underline">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductExtraInfo;
