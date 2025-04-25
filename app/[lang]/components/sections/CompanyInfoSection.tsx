import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import LogoAgent from '@/public/icons/ic_logo-agent.webp';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPin,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';

const CompanyInfoSection = () => {
  const contact = [
    {
      icon: <MapPin size={16} />,
      text: '183/33 Bến Văn Đồn, Phường 09, Quận 4, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
      icon: <PhoneIcon size={16} />,
      text: 'Hotline: 0389647778',
    },
    {
      icon: <MailIcon size={16} />,
      text: 'cskh@freny.ai',
    },
  ];
  const social = [
    {
      icon: <FacebookIcon size={16} />,
      href: '#',
    },
    {
      icon: <InstagramIcon size={16} />,
      href: '#',
    },
    {
      icon: <TwitterIcon size={16} />,
      href: '#',
    },
    {
      icon: <YoutubeIcon size={16} />,
      href: '#',
    },
    {
      icon: <LinkedinIcon size={16} />,
      href: '#',
    },
  ];

  return (
    <SectionDashboardLayout className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={LogoAgent.src} alt="Logo Agent" className="w-24 h-12" />
            </div>
            <p className="text-sm mb-2">CÔNG TY TNHH MTV KDN</p>
            <p className="text-sm mb-2">
              Giấy chứng nhận đăng ký kinh doanh số: 0314940727 do Sở Kế hoạch
              và Đầu tư thành phố Hồ Chí Minh cấp lần đầu ngày 26/03/2018, thay
              đổi lần thứ 9 ngày 18/11/2024
            </p>
            {contact.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-2 gap-2 align-middle"
              >
                {item.icon}
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Cách tạo chatbot</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  VNFPAY
                </a>
              </li>
            </ul>
          </div>

          {/* Chatbot Description */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kết nối hỗ trợ</h3>
            <div className="flex space-x-4 mb-4">
              {social.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 gap-2 align-middle hover:cursor-pointer"
                >
                  {item.icon}
                </div>
              ))}
            </div>
            <p className="text-sm">
              AI Chatbot Preny là giải pháp ứng dụng trí tuệ nhân tạo (AI) giúp
              các doanh nghiệp tự động hóa khách hàng, tăng tỷ lệ chuyển đổi,
              nhặt lại khi doanh nghiệp có khách hàng ở đa nền tảng. Vì khả năng
              tự học, Chatbot AI Freny giúp các khách hàng ngay trong 15 giây
              đầu tiên, Chatbot AI Freny giúp các khách hàng sẵn sàng và tự động
              lựa được thông tin khách hàng, thúc đẩy họ đến quyết định mua
              hàng.
            </p>
          </div>
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default CompanyInfoSection;
