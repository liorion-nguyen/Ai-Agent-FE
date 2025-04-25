'use client';

import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import { useZodForm } from '@/shared/hooks';
import { consultationFormSchema } from '@/shared/validations/form/consultation.schema';

const ConsultationFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(consultationFormSchema);

  const onSubmit = (data: {
    name: string;
    phone: string;
    businessField: string;
  }) => {
    console.log('Form submitted:', data);
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <SectionDashboardLayout className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Đăng ký nhận tư vấn viết kịch bản chatbot
        </h2>
        <p className="text-white mb-12">
          Bạn cần tư vấn viết kịch bản chatbot chốt đơn để đạt?
        </p>
        <div className="max-w-md mx-auto bg-purple-800 rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Tên của bạn"
                {...register('name')}
                className="w-full p-3 rounded-md bg-purple-700 text-white placeholder-gray-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                {...register('phone')}
                className="w-full p-3 rounded-md bg-purple-700 text-white placeholder-gray-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.phone && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Business Field Input */}
            <div>
              <input
                type="text"
                placeholder="Lĩnh vực kinh doanh của bạn"
                {...register('businessField')}
                className="w-full p-3 rounded-md bg-purple-700 text-white placeholder-gray-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.businessField && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.businessField.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Gửi thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionDashboardLayout>
  );
};

export default ConsultationFormSection;
