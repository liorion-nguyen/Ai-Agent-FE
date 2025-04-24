import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const SizePick = ({
  rawSize,
}: {
  rawSize: { size: string; stockQuantity: number }[];
}) => {
  const { t } = useTranslation('product-detail');
  return (
    <>
      {/* Size Pick and Other Information */}
      <div className="flex flex-col md:pl-[80px] md:pr-[60px]">
        {/* Size Pick */}
        <div className="flex flex-col md:h-[98px]">
          {/* Size Type and Size Chart */}
          <div className="flex justify-between align-middle ">
            <div className="flex md:gap-[8px] items-center">
              <p className="font-sf md:font-[500] md:text-[14px] md:leading-[20px] md:tracking-[2px] align-middle uppercase">
                {t('size')}:
              </p>
              <select
                name="sizeType"
                id="sizeType"
                className="bg-transparent md:w-[48px] font-sf md:font-[500] md:text-[13.67px] md:leading-[20px]"
              >
                <option value="US">US</option>
                <option value="VN">VN</option>
                <option value="EU">EU</option>
              </select>
            </div>
            <button className="underline font-sf md:font-[400] md:text-[14px] md:leading-[20px] md:tracking-[0.5px] cursor-pointer">
              {t('sizeChart')}
            </button>
          </div>
          {/* Size pick */}
          <div className="md:mt-[16px] flex md:gap-[8px]">
            {rawSize.map((item, index) => (
              <button
                disabled={!item.stockQuantity}
                key={index}
                className={`md:w-[54px] md:h-[40px] border border-[#DCDBDD] border-dashed cursor-pointer ${item.stockQuantity ? '' : 'bg-[#F1F1F1] line-through text-[#A7A7A7] cursor-not-allowed'}`}
                onClick={() => console.log('size clicked')}
              >
                {item.size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex flex-col md:gap-[24px]">
          <p className="font-sf md:font-[400] md:text-[14px] md:leading-[16px] md:tracking-[0.5px] align-middle">
            {t('fit')}
          </p>
          <Button className="md:h-[48px] md:w-full border border-[#DCDBDD] border-dashed md:rounded-[5px] font-sf md:font-[500] md:text-[15.5px] md:leading-[16px] md:tracking-[2px] align-middle">
            {t('addToCart')}
          </Button>
          {/* <button className="md:h-[48px] md:w-full border border-[#DCDBDD] border-dashed md:rounded-[5px] bg-black text-white font-sf md:font-[500] md:text-[15.5px] md:leading-[16px] md:tracking-[2px] align-middl">
            {t('addToCart')}
          </button> */}
        </div>

        {/* Extra Information */}
        <div className="flex flex-col md:mt-[8px]">
          <p className="font-sf md:font-[500] md:text-[16px] md:leading-[24px] md:tracking-[0.5px] align-middle">
            {t('freeShip')}
          </p>
          <p className="font-sf md:font-[400] md:text-[14px] md:leading-[24px] md:tracking-[0.5px] align-middle">
            {t('returnPolicy')}
            <Link href={'#'} className="underline">
              {t('learnMore')}
            </Link>
          </p>
        </div>

        {/* Details and Shipping & Return */}
        <div className="grid grid-cols-2 auto-rows-auto md:mt-[20px] gap-[5px]">
          <div className="border-t border-black p-[18px]">
            <button className="font-nanum md:font-[400] md:text-[26px] md:leading-[24px] md:tracking-[1px] align-middle">
              + {t('details')}
            </button>
          </div>
          <div className="border-t border-black p-[18px]">
            <button className="font-nanum md:font-[400] md:text-[26px] md:leading-[24px] md:tracking-[1px] align-middle">
              + {t('shipping')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizePick;
