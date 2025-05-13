import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import Img from '@/components/ui/Image';
import BannerRight from '@/public/images/bannerRight.png';
const HeroSection = () => {
  return (
    <SectionDashboardLayout className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Tăng 50% tỷ lệ chốt sales khi dùng AI Chatbot
          </h1>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              AI Chatbot {process.env.NEXT_PUBLIC_NAME_APP} tăng tỷ lệ chốt Sale
              tự động 2 năm vì khách hàng
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Tăng 75% tỷ lệ khách hàng phản hồi trong 10s đầu của cuộc hội
              thoại
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Tăng 50% tỷ lệ chốt đơn nhừo các tính năng đặc biệt cho{' '}
              {process.env.NEXT_PUBLIC_NAME_APP}
            </li>
          </ul>
          <div className="space-x-4">
            <a
              href="/signup"
              className="inline-block px-6 py-3 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Định thử ngay
            </a>
            <a
              href="/contact-sales"
              className="inline-block px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-purple-600 transition"
            >
              Liên hệ sales
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-8 md:mt-0 flex justify-center w-100">
          {/* <video
            src="https://preny.ai/video/video-preny.mp4"
            autoPlay
            muted
            loop
            className="w-full max-w-md rounded-lg shadow-lg"
          /> */}
          <Img
            src={BannerRight.src}
            alt="Banner Right"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default HeroSection;
