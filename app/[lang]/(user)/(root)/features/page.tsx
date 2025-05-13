'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import Img from '@/components/ui/Image';
import { Separator } from '@/components/ui/Separator';
import { useCallback, useEffect, useMemo, useState } from 'react';

const FeaturesPage = () => {
  const data = useMemo(
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
        description:
          'Trả lời bằng hình ảnh giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.',
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-10.png&w=1080&q=75',
        ],
      },
      {
        id: 'tool-facebook-ads',
        title: 'Tool Facebook Ads',
        description:
          'Tool Facebook Ads giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.',
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-11.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-12.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-13.png&w=1080&q=75',
        ],
      },
      {
        id: 'su-dung-kien-thuc-llm-tra-loi-cau-hoi-khong',
        title: 'Sử dụng kiến thức LLM trả lời câu hỏi khó',
        description:
          'Sử dụng kiến thức LLM trả lời câu hỏi khó giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.',
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-14.png&w=1080&q=75',
        ],
      },
      {
        id: 'phan-quyen-cho-sales',
        title: 'Phân quyền cho sales',
        description:
          'Phân quyền cho sales giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.',
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-15.png&w=1080&q=75',
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-16.png&w=1080&q=75',
        ],
      },
      {
        id: 'ho-tro-da-ngon-ngu',
        title: 'Hỗ trợ đa ngôn ngữ',
        description:
          'Hỗ trợ đa ngôn ngữ giúp doanh nghiệp tạo kịch bản chatbot chốt sales dễ training, dễ sử dụng, dễ hiểu, dễ sử dụng.',
        images: [
          'https://preny.ai/_next/image?url=%2Fimages%2Ftinh-nang%2Fimg_feature-17.png&w=1080&q=75',
        ],
      },
    ],
    [],
  );

  const [activeSection, setActiveSection] = useState<string | null>(
    data[0]?.id || '',
  );

  // Handle click to scroll to section with offset
  const handleClick = useCallback(
    (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; // Adjust based on your header height
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

  // IntersectionObserver to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' }, // Adjust rootMargin based on header height
    );

    data.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      data.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [data]);

  return (
    <DashboardLayout>
      <SectionDashboardLayout className="pb-20">
        <div className="flex flex-row gap-8">
          {/* Fixed Sidebar on the Left */}
          <div className="w-1/4 fixed top-20 h-[calc(100vh-80px)] overflow-hidden">
            <ul className="flex flex-col gap-4 pt-5">
              {data.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(item.id, e)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                        : 'text-gray-600 hover:text-blue-500 hover:border-l-4 hover:border-blue-500 hover:pl-2'
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer to prevent content overlap with fixed sidebar */}
          <div className="w-1/4"></div>

          {/* Vertical Separator */}
          <Separator orientation="vertical" className="bg-gray-400 h-auto" />

          {/* Scrollable Content on the Right */}
          <div
            className="w-3/4 pt-5 overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <h1 className="text-3xl font-bold max-w-2xl text-center">
              Tính năng chốt sales đặc biệt của AI Chatbot
              {process.env.NEXT_PUBLIC_NAME_APP}
            </h1>
            <p className="mt-2 text-gray-600">
              <a href="#" className="text-blue-600 hover:underline mr-2">
                AI Chatbot
              </a>
              {process.env.NEXT_PUBLIC_NAME_APP} sở hữu nhiều tính năng nổi bật
              của một AI chatbot bán hàng đa kênh hiệu quả, tăng khả năng chốt
              đơn thành công cho mọi ngành hàng. Các tính năng của{' '}
              {process.env.NEXT_PUBLIC_NAME_APP} sẽ giúp người dùng tăng được
              trải nghiệm khách hàng trên các kênh bán hàng của mình, tự động
              chăm sóc và tư vấn khách hàng theo kịch bản chốt sales chuyên
              nghiệp.
            </p>

            {/* Content Sections */}
            {data.map((item, index) => (
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
                {index < data.length - 1 && (
                  <Separator
                    orientation="horizontal"
                    className="my-8 bg-gray-400"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionDashboardLayout>
    </DashboardLayout>
  );
};

export default FeaturesPage;
