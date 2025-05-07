import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import Img from '@/components/ui/Image';

const ReasonsSection = () => {
  const reasons = [
    {
      number: '01',
      icon: '💬',
      title:
        'Kích bản chốt sales đa dạng phục vụ mục tiêu tăng tỷ lệ chuyển đổi',
    },
    {
      number: '02',
      icon: '📚',
      title: 'Chatbot có thể tự học hỏi khách hàng lấy thông tin',
    },
    {
      number: '03',
      icon: '⚙️',
      title: 'Đội ngũ hỗ trợ trực tiếp nhanh chóng',
    },
    {
      number: '04',
      icon: '✅',
      title: 'Tăng tỷ lệ chốt sale 50% đã được kiểm chứng',
    },
  ];

  return (
    <SectionDashboardLayout className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Lý do nên sử dụng AI Chatbot Freny
        </h2>
        <p className="text-center text-gray-600 mb-12">
          AI chatbot Freny có nhiều tính năng độc đáo giúp bạn tăng 50% chuyển
          đổi trên Fanpage và website
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 space-y-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex-col items-start p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600 mr-4">
                    {reason.number}
                  </div>
                  <div className="text-3xl mr-4">{reason.icon}</div>
                </div>
                <p className="text-gray-800">{reason.title}</p>
              </div>
            ))}
            <div className="text-center md:text-left">
              <a
                href="/signup"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition"
              >
                Dùng thử ngay
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-2/3 mt-8 md:mt-0 flex justify-center">
            <Img
              src="https://preny.ai/_next/image?url=%2Fimages%2Fimg_banner-reason.png&w=1920&q=75"
              alt="AI Chatbot Freny Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default ReasonsSection;
