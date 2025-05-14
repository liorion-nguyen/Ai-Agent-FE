'use client';

import Img from '@/components/ui/Image';
import { Separator } from '@/components/ui/Separator';

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

type ContentFeaturesProps = {
  featureData: FeatureItem[];
};

const ContentFeatures = ({ featureData }: ContentFeaturesProps) => {
  return (
    <div
      className="w-3/4 pt-5 overflow-y-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      <h1 className="text-3xl font-bold max-w-2xl text-center">
        Tính năng chốt sales đặc biệt của AI Chatbot{' '}
        {process.env.NEXT_PUBLIC_NAME_APP}
      </h1>
      <p className="mt-2 text-gray-600">
        <a href="#" className="text-blue-600 hover:underline mr-2">
          AI Chatbot
        </a>
        {process.env.NEXT_PUBLIC_NAME_APP} sở hữu nhiều tính năng nổi bật của
        một AI chatbot bán hàng đa kênh hiệu quả, tăng khả năng chốt đơn thành
        công cho mọi ngành hàng. Các tính năng của{' '}
        {process.env.NEXT_PUBLIC_NAME_APP} sẽ giúp người dùng tăng được trải
        nghiệm khách hàng trên các kênh bán hàng của mình, tự động chăm sóc và
        tư vấn khách hàng theo kịch bản chốt sales chuyên nghiệp.
      </p>

      {/* Content Sections */}
      {featureData.map((item, index) => (
        <div key={item.id} id={item.id} className="scroll-mt-20">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-gray-600">{item.description}</p>
          <div className="mt-4 flex gap-4 flex-col items-center">
            {item.images.map((image, idx) => (
              <div
                key={idx}
                className="w-full h-auto rounded-lg bg-slate-300 flex justify-center items-center"
              >
                <Img
                  src={image}
                  alt={`${item.title}-${idx}`}
                  className="w-1/3 h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Horizontal Separator Between Sections (Except the Last) */}
          {index < featureData.length - 1 && (
            <Separator orientation="horizontal" className="my-8 bg-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentFeatures;
