import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import { CircleCheck } from 'lucide-react';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: 'Gói dùng thử',
      price: 'Miễn phí/7 ngày',
      features: [
        { text: 'Dùng Freny Model 1.0', highlighted: true },
        { text: 'Giới hạn 1 page, 1 web' },
        { text: 'Giới hạn 2000 tin nhắn và 20 người dùng training' },
        { text: 'Tối đa 5 member' },
      ],
      buttonText: 'Chọn gói',
      buttonVariant: 'outline',
    },
    {
      title: 'Gói cơ bản',
      price: '499.000đ/tháng',
      priceNote: 'Tiết kiệm 20% khi sử dụng gói',
      features: [
        { text: 'Dùng Freny Model 1.0', highlighted: true },
        { text: 'Đăng ký' },
        { text: '12 tháng' },
        { text: '1 tháng' },
        { text: 'Giới hạn 1 page, 5 website' },
        { text: '0 - 5000 tin nhắn, giới hạn 100 tài liệu training' },
        { text: 'Tích hợp website, Facebook, Zalo OA, Instagram và Lazada' },
        { text: 'Có dashboard quản lý training AI và hỗ trợ vói khách hàng' },
        { text: 'Tối đa 5 member' },
      ],
      buttonText: 'Chọn gói',
      buttonVariant: 'outline',
      badge: 'BƯỚC SỬ DỤNG NHIỀU',
    },
    {
      title: 'Gói nâng cao',
      price: '999.000đ/tháng',
      priceNote: 'Tiết kiệm 20% khi sử dụng gói',
      features: [
        { text: 'Dùng Freny Model 2.0', highlighted: true },
        { text: 'Đăng ký' },
        { text: '12 tháng' },
        { text: '6 tháng' },
        { text: 'Giới hạn 20 page, 20 website' },
        { text: '0 - 15.000 tin nhắn' },
        { text: 'Khống giới hạn tài liệu' },
        { text: 'Tích hợp website, Facebook, Zalo OA, Instagram và Lazada' },
        { text: 'Có dashboard quản lý training AI và hỗ trợ vói khách hàng' },
        { text: 'Phân quyền cho thành sale sóc' },
        { text: 'Không giới hạn member' },
        { text: 'Sử dụng kho ảnh 200 tấm' },
      ],
      buttonText: 'Chọn gói',
      buttonVariant: 'outline',
      badge: 'BƯỚC KHUYẾN KHÍCH',
    },
    {
      title: 'Gói doanh nghiệp',
      price: '1.999.000đ/tháng',
      priceNote: 'Tiết kiệm 20% khi sử dụng gói',
      features: [
        { text: 'Dùng Freny Model 3.0', highlighted: true },
        { text: 'Đăng ký' },
        { text: '12 tháng' },
        { text: '6 tháng' },
        { text: 'Giới hạn 100 page, 100 website' },
        { text: '0 - 30.000 tin nhắn' },
        { text: 'Khống giới hạn tài liệu' },
        { text: 'Tích hợp website, Facebook, Zalo OA, Instagram và Lazada' },
        { text: 'Có dashboard quản lý training AI và hỗ trợ vói khách hàng' },
        { text: 'Hỗ trợ tư vấn kịch bản tạo chatbot chuyển đổi cao nhất' },
        { text: 'Hỗ trợ 1:1 cho sự quản trị sử dụng dịch vụ' },
        { text: 'Cung cấp số liệu để tối ưu chiến dịch quảng cáo' },
        { text: 'Không giới hạn member' },
        { text: 'Sử dụng kho ảnh 500 tấm' },
      ],
      buttonText: 'Chọn gói',
      buttonVariant: 'default',
    },
  ];

  return (
    <SectionDashboardLayout className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Báo giá dịch vụ</h2>
        <p className="text-center text-gray-600 mb-12">
          Chi tiết các gói dịch vụ AI chatbot
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between pt-20"
            >
              {/* Badge (if present) */}
              {plan.badge && (
                <div className="absolute top-0 left-0 w-full bg-blue-600 rounded-t-lg p-2">
                  <span className="px-4 py-1 rounded-full text-white text-sm font-medium">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Title and Price */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 text-center mb-2 bg-purple-50 p-2 rounded-xl">
                  {plan.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 text-center">
                  {plan.price.split('/')[0]}{' '}
                  <span className="text-sm text-gray-600">
                    /{plan.price.split('/')[1]}
                  </span>
                </p>
                {plan.priceNote && (
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {plan.priceNote}
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-2 my-4 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 text-gray-600 ${
                      feature.highlighted ? 'text-purple-600 font-semibold' : ''
                    }`}
                  >
                    <CircleCheck color="#302e7a" size={16} />
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="text-center">
                <button
                  className={`w-full py-2 rounded-md font-medium transition ${
                    plan.buttonVariant === 'default'
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default PricingSection;
