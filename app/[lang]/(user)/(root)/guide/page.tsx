'use client';

import ContentGuide from '@/app/[lang]/(user)/(root)/guide/components/ContentGuide';
import SidebarGuide from '@/app/[lang]/(user)/(root)/guide/components/SidebarGuide';
import { Separator } from '@/components/ui/Separator';
import { useCallback, useEffect, useMemo, useState } from 'react';

const GuidePage = () => {
  const guideData = useMemo(
    () => [
      {
        id: 'getting-started',
        title: 'Bắt đầu với AI Chatbot',
        description: `Hướng dẫn này sẽ giúp bạn thiết lập và sử dụng ${process.env.NEXT_PUBLIC_NAME_APP} để bắt đầu tự động hóa quy trình bán hàng. Từ việc tạo tài khoản đến tích hợp chatbot trên website hoặc fanpage, bạn sẽ được hướng dẫn từng bước.`,
        images: ['https://preny.ai/images/huong-dan/img_huong-dan-2.png'],
      },
      {
        id: 'configure-chatbot',
        title: 'Cấu hình kịch bản Chatbot',
        description: `Tìm hiểu cách tạo kịch bản chốt sales chuyên nghiệp với ${process.env.NEXT_PUBLIC_NAME_APP}. Hướng dẫn này bao gồm cách thiết lập câu trả lời tự động, phân loại khách hàng, và tối ưu hóa trải nghiệm người dùng.`,
        images: [
          'https://preny.ai/images/huong-dan/img_huong-dan-3.png',
          'https://preny.ai/images/huong-dan/img_huong-dan-4.png',
        ],
      },
      {
        id: 'multi-platform',
        title: 'Quản lý tin nhắn đa nền tảng',
        description: `Hướng dẫn cách tích hợp ${process.env.NEXT_PUBLIC_NAME_APP} với các nền tảng như Facebook, Instagram, email, và website để quản lý tin nhắn từ khách hàng một cách hiệu quả.`,
        images: [
          'https://preny.ai/images/huong-dan/img_huong-dan-5.png',
          'https://preny.ai/images/huong-dan/img_huong-dan-6.png',
        ],
      },
      {
        id: 'analyze-performance',
        title: 'Phân tích hiệu suất Chatbot',
        description: `Học cách sử dụng các công cụ phân tích của ${process.env.NEXT_PUBLIC_NAME_APP} để theo dõi tỷ lệ chốt đơn, thời gian giữ chân khách hàng, và các chỉ số hiệu suất khác.`,
        images: ['https://preny.ai/images/huong-dan/img_huong-dan-7.png'],
      },
      {
        id: 'advanced-tips',
        title: 'Mẹo nâng cao cho Chatbot',
        description: `Khám phá các mẹo và thủ thuật nâng cao để tối ưu hóa chatbot của bạn, bao gồm sử dụng thẻ tags, hỗ trợ đa ngôn ngữ, và tích hợp với các công cụ quảng cáo như Facebook Ads.`,
        images: ['https://preny.ai/images/huong-dan/img_huong-dan-8.png'],
      },
    ],
    [],
  );

  const [activeSection, setActiveSection] = useState<string | null>(
    guideData[0]?.id || '',
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

    guideData.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      guideData.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [guideData]);

  return (
    <div className="flex flex-row gap-8">
      <SidebarGuide
        guideData={guideData}
        activeSection={activeSection}
        handleClick={handleClick}
      />
      <div className="w-1/4"></div>
      <Separator orientation="vertical" className="bg-gray-400 h-auto" />
      <ContentGuide guideData={guideData} />
    </div>
  );
};

export default GuidePage;
