'use client';
import { ProductDetail } from '@/shared/types';
import { formatCurrency } from '@/shared/utils';
import Preview from '@/app/[lang]/(user)/(root)/product/[slug]/components/ProductInfo/ProductPreview';
import SizePick from './ProductSizePick';
import Image from 'next/image';

const rawProductData: ProductDetail = {
  id: 'uuid-product-1',
  name: 'Laptop Pro X',
  description: 'A high-performance laptop.',
  basePrice: 1299.99,
  baseSku: 'T-SHIRT-RED-M',
  baseImageUrl: 'https://example.com/image.jpg',
  createdAt: '2023-10-27T10:00:00.000Z',
  updatedAt: '2023-10-27T10:00:00.000Z',
  productVariants: [
    {
      id: 'uuid-product-variant',
      sku: 'T-SHIRT-RED-M',
      price: 1299.99,
      stockQuantity: 100,
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      imageUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      productId: 'uuid-product',
      product: 'string',
      createdAt: '2023-10-27T10:00:00.000Z',
      updatedAt: '2023-10-27T10:00:00.000Z',
    },
  ],
  categories: [
    {
      id: 'uuid-product-category-1',
      createdAt: '2023-10-27T10:00:00.000Z',
      updatedAt: '2023-10-27T10:00:00.000Z',
      productId: 'uuid-product',
      product: 'string',
      categoryId: 'uuid-category',
      category: {
        id: 'uuid-category-1',
        name: 'T-Shirt',
        description: 'This is a category description',
        parentId: 'uuid-category-2',
        imageUrl: 'https://example.com/category-image.jpg',
        createdAt: '2023-10-27T10:00:00.000Z',
        updatedAt: '2023-10-27T10:00:00.000Z',
        products: ['string'],
      },
    },
  ],
};

const rawSize: { size: string; stockQuantity: number }[] = [
  { size: 'XS', stockQuantity: 0 },
  { size: 'S', stockQuantity: 100 },
  { size: 'M', stockQuantity: 100 },
  { size: 'L', stockQuantity: 100 },
  { size: 'XL', stockQuantity: 100 },
];

const ProductInfo = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:auto-rows-auto bg-black p-1 gap-1 text-black">
      {/* <img src="#" alt="This is preview image" /> */}
      {/* <div className=" md:h-[1000px] bg-slate-400"></div> */}
      <Image
        src={'/images/product-img-test.png'}
        alt="This is IMG"
        width={0}
        height={0}
        style={{ height: '1000px', width: '714px', objectFit: 'cover' }}
        unoptimized
      />
      <div className="row-span-3">
        <div className="sticky top-0 h-[1000px] bg-[url('/images/bg-product.png')] bg-cover flex flex-col md:gap-[24px]">
          {/* TITLE */}
          <div className="flex justify-between md:mt-[40px] md:ml-[80px]">
            <div className=" flex flex-col gap-[12px]">
              {/* Product Name */}
              <p className="md:font-[400] md:text-[48px] md:leading-[50px] align-middle md:tracking-[2%] md:w-[300px] bg-yellow-200 font-bangers">
                {rawProductData.name}
              </p>
              <div className="flex  items-center gap-[7px]">
                {/* Actual Price (After Sale) */}
                <div className="flex justify-center items-center  bg-[#70A8F1] md:w-[74px] md:h-[37px] md:rounded-[2px] -rotate-[5deg]">
                  <p className="md:font-[400] md:text-[22px] md:leading-[16px] align-middle md:tracing-[1px] uppercase">
                    {formatCurrency(rawProductData.basePrice)}
                  </p>
                </div>
                {/* Original Price */}
                <p className="font-nanum md:font-[400] md:text-[26px] md:leading-[24px] align-middle md:tracing-[1px] line-through">
                  {formatCurrency(rawProductData.basePrice)}
                </p>
              </div>
            </div>
            <div className="md:mr-[32px] w-[80px] h-[80px] rounded-[10px] bg-red-400"></div>
          </div>
          <Preview />
          <SizePick rawSize={rawSize} />
        </div>
      </div>
      <Image
        src={'/images/product-img-test.png'}
        alt="This is IMG"
        width={0}
        height={0}
        style={{ height: '1000px', width: '714px', objectFit: 'cover' }}
        unoptimized
      />
      <Image
        src={'/images/product-img-test.png'}
        alt="This is IMG"
        width={0}
        height={0}
        style={{ height: '1000px', width: '714px', objectFit: 'cover' }}
        unoptimized
      />
    </div>
  );
};

export default ProductInfo;
