import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import Img from '@/components/ui/Image';

const PlatformsSection = () => {
  const platforms = [
    {
      name: 'Facebook',
      image:
        'https://preny.ai/_next/image?url=%2Fimages%2Fimg_chatbot-home-5.png&w=640&q=75',
    },
    {
      name: 'Website',
      image:
        'https://preny.ai/_next/image?url=%2Fimages%2Fimg_chatbot-home-1.png&w=640&q=75',
    },
    {
      name: 'Zalo',
      image:
        'https://preny.ai/_next/image?url=%2Fimages%2Fimg_chatbot-home-3.png&w=640&q=75',
    },
    {
      name: 'Lazada',
      image:
        'https://preny.ai/_next/image?url=%2Fimages%2Fimg_chatbot-home-4.png&w=640&q=75',
    },
  ];

  return (
    <SectionDashboardLayout className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          AI Chatbot Freny tích hợp đa nền tảng
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Tích hợp AI Chatbot để đáp ứng giúp bạn tối ưu chuyển đổi trên mọi nền
          tảng
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-md overflow-hidden group h-64 hover:cursor-pointer"
            >
              {/* Image with dimming effect on hover */}
              <div className="absolute inset-0">
                <Img
                  src={platform.image}
                  alt={platform.name}
                  className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-50"
                />
              </div>

              {/* Platform Name */}
              <div className="relative z-10 flex items-end justify-center h-full p-4">
                <p className="text-white text-xs">{platform.name}</p>
              </div>

              {/* Button - Hidden by default, visible on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition">
                  Hướng dẫn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default PlatformsSection;
