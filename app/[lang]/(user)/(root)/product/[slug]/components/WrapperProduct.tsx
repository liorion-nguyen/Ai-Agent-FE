import ProductInfo from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductInfo/ProductInfo';
import ImageSlider from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductImgSlider/ProductImgSlider';
import ProductExtraInfo from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductExtraInfo/ProductExtraInfo';

const WrapperProduct = () => {
  return (
    <>
      <ProductInfo />
      <ImageSlider />
      <img
        src="/images/product-dash.png"
        alt="Dash split section"
        className="md:w-[1440px] md:h-[36px] object-cover"
      />
      <ProductExtraInfo />
    </>
  );
};

export default WrapperProduct;
