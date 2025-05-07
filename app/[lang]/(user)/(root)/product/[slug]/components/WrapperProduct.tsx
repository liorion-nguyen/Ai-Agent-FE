import ProductExtraInfo from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductExtraInfo/ProductExtraInfo';
import ImageSlider from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductImgSlider/ProductImgSlider';
import ProductInfo from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductInfo/ProductInfo';
import Img from '@/components/ui/Image';

const WrapperProduct = () => {
  return (
    <>
      <ProductInfo />
      <ImageSlider />
      <Img
        src="/images/product-dash.png"
        alt="Dash split section"
        className="md:w-[1440px] md:h-[36px] object-cover"
      />
      <ProductExtraInfo />
    </>
  );
};

export default WrapperProduct;
