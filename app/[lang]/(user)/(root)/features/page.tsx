'use client';

import ContentFeatures from '@/app/[lang]/(user)/(root)/features/components/ContentFeatures';
import SidebarFeatures from '@/app/[lang]/(user)/(root)/features/components/SidebarFeatures';
import { Separator } from '@/components/ui/Separator';
import { useCallback, useEffect, useMemo, useState } from 'react';

const FeaturesPage = () => {
  const featureData = useMemo(
    () => [
      {
        id: 'ngon-ngu-tra-loi-tu-nhien-nhu-nguoi-that',
        title: 'Ngôn ngữ trả lời tự nhiên như người thật',
        description: `Ngôn ngữ AI chatbot tự nhiên như người thật: giọng điệu, cách trả lời của ${process.env.NEXT_PUBLIC_NAME_APP} mang phong cách giống chủ doanh nghiệp, shop → Giúp khách hàng cảm giác đang chat với nhân viên thực sự.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-1.png&w=1920&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-2.png&w=1920&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-3.png&w=1920&q=75',
        ],
      },
      {
        id: 'hoat-dong-24-7-tang-ty-le-chet-sales-ban-dem',
        title: 'Hoạt động 24/7, tăng tỷ lệ chốt sales ban đêm',
        description: `Khách hàng có xu hướng nhắn tin mua hàng vào ban đêm và cuối tuần, và đây cũng là thời gian nhiều doanh nghiệp bỏ lỡ cơ hội chốt sales nhất vì không có nhân viên trực page. Chính vì vậy AI chatbot ${process.env.NEXT_PUBLIC_NAME_APP} có thể khắc phục vấn đề này hiệu quả với khả năng hoạt động 24/7, tăng tỷ lệ chốt đơn của khách hàng vào ban đêm và các ngày lễ.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-4.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-5.png&w=1920&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-6.png&w=1920&q=75',
        ],
      },
      {
        id: 'giu-chan-khach-hang-den-15s',
        title: 'Giữ chân khách hàng đến 15s',
        description: `Với mục tiêu tăng tỷ lệ chốt sales, AI chatbot ${process.env.NEXT_PUBLIC_NAME_APP} có thể chiều lòng khách hàng bằng cách trả lời thông minh và hài hước. Theo kết quả đo lường từ những nền tảng của doanh nghiệp đã tích hợp AI chatbot, ${process.env.NEXT_PUBLIC_NAME_APP} đã giúp giữ chân hơn 70% khách hàng trên website, fanpage tới 15 giây.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-7.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-8.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-9.png&w=1080&q=75',
        ],
      },
      {
        id: 'co-he-thong-quan-ly-tin-nhan-da-nen-tang',
        title: 'Có hệ thống quản lý tin nhắn đa nền tảng',
        description: `Hệ thống quản lý tin nhắn đa nền tảng của ${process.env.NEXT_PUBLIC_NAME_APP} giúp doanh nghiệp quản lý tất cả tin nhắn từ khách hàng trên các nền tảng mạng xã hội, website, fanpage, điện thoại, email, …`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-6.png&w=1080&q=75',
        ],
      },
      {
        id: 'the-tags-phan-loai-khach-hang',
        title: 'Thẻ tags phân loại khách hàng',
        description: `Thẻ tags phân loại khách hàng giúp doanh nghiệp phân loại khách hàng dựa trên nhu cầu, mục tiêu, độ tuổi, giới tính, vị trí, … để từ đó tạo kế hoạch marketing phù hợp.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-7.png&w=1080&q=75',
        ],
      },
      {
        id: 'phan-loai-trang-thai-cuoc-hoi-thoai',
        title: 'Phân loại trạng thái cuộc hội thoại',
        description: `Phân loại trạng thái cuộc hội thoại giúp doanh nghiệp phân loại cuộc hội thoại dựa trên nhu cầu, mục tiêu, độ tuổi, giới tính, vị trí, … để từ đó tạo kế hoạch marketing phù hợp.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-8.png&w=1080&q=75',
        ],
      },
      {
        id: 'kich-ban-chatbot-chet-sales-de-training',
        title: 'Kịch bản chatbot chốt sales dễ training',
        description: `Kịch bản chatbot chốt sales dễ training giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-9.png&w=1080&q=75',
        ],
      },
      {
        id: 'tra-loi-bang-hinh-anh',
        title: 'Trả lời bằng hình ảnh',
        description: `Trả lời bằng hình ảnh giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-10.png&w=1080&q=75',
        ],
      },
      {
        id: 'tool-facebook-ads',
        title: 'Tool Facebook Ads',
        description: `Tool Facebook Ads giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-11.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-12.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-13.png&w=1080&q=75',
        ],
      },
      {
        id: 'su-dung-kien-thuc-llm-tra-loi-cau-hoi-khong',
        title: 'Sử dụng kiến thức LLM trả lời câu hỏi khó',
        description: `Sử dụng kiến thức LLM trả lời câu hỏi khó giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-14.png&w=1080&q=75',
        ],
      },
      {
        id: 'phan-quyen-cho-sales',
        title: 'Phân quyền cho sales',
        description: `Phân quyền cho sales giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-15.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-16.png&w=1080&q=75',
        ],
      },
      {
        id: 'ho-tro-da-ngon-ngu',
        title: 'Hỗ trợ đa ngôn ngữ',
        description: `Hỗ trợ đa ngôn ngữ giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.`,
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-17.png&w=1080&q=75',
        ],
      },
    ],
    [],
  );

  const [activeSection, setActiveSection] = useState<string | null>(
    featureData[0]?.id || '',
  );

  const handleClick = useCallback(
    (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' },
    );

    featureData.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      featureData.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [featureData]);

  return (
    <div className="flex flex-row gap-8">
      <SidebarFeatures
        featureData={featureData}
        activeSection={activeSection}
        handleClick={handleClick}
      />
      <div className="w-1/4"></div>
      <Separator orientation="vertical" className="bg-gray-400 h-auto" />
      <ContentFeatures featureData={featureData} />
    </div>
  );
};

export default FeaturesPage;
