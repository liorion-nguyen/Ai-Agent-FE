import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';

const CaseStudiesSection = () => {
  const industries = [
    { name: 'Mỹ phẩm', icon: '💄' },
    { name: 'Nha khoa', icon: '🦷' },
    { name: 'Nhà hàng', icon: '🍴' },
    { name: 'Khóa học', icon: '📚' },
    { name: 'Thời trang', icon: '👗' },
    { name: 'In ấn', icon: '🖨️' },
  ];

  return (
    <SectionDashboardLayout className="bg-white py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Các ngành đã ứng dụng AI Chatbot {process.env.NEXT_PUBLIC_NAME_APP}{' '}
          hiệu quả
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Case study các ngành hàng đã ứng dụng thành công AI chatbot{' '}
          {process.env.NEXT_PUBLIC_NAME_APP}, tăng hơn 50% doanh thu
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-purple-50 p-6 rounded-lg text-center shadow-md"
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-lg font-semibold text-purple-600">
                {industry.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default CaseStudiesSection;
