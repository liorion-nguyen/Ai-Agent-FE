'use client';
import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import { Skeleton } from '@/components/ui/Skeleton';
import useSubscriptionStore from '@/store/subscription';
import { CircleCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useSubscriptions } from '../../hooks/useSubscription';
const PricingSection = () => {
  const { subscriptions } = useSubscriptionStore();

  const { getSubscriptions, loading } = useSubscriptions();
  const router = useRouter();
  useLayoutEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  return (
    <SectionDashboardLayout className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Báo giá dịch vụ</h2>
        <p className="text-center text-gray-600 mb-12">
          Chi tiết các gói dịch vụ AI chatbot
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-[300px] w-full" />
              ))
            : subscriptions.map((plan, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between"
                >
                  {/* Badge (if present) */}
                  {/* {plan.badge && (
                    <div className="absolute top-0 left-0 w-full bg-blue-600 rounded-t-lg p-2">
                      <span className="px-4 py-1 rounded-full text-white text-sm font-medium">
                        {plan.badge}
                      </span>
                    </div>
                  )} */}

                  {/* Plan Title and Price */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 text-center mb-2 bg-purple-50 p-2 rounded-xl">
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 text-center">
                      {plan.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                      <span className="text-sm text-gray-600">
                        /
                        {plan.price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </p>
                    {/* {plan.priceNote && (
                      <p className="text-sm text-gray-600 text-center mb-4">
                        {plan.priceNote}
                      </p>
                    )} */}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 my-4 flex-grow">
                    {plan.subscription_features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-2 text-gray-600`}
                      >
                        <CircleCheck color="#302e7a" size={16} />
                        {feature.feature.name}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className="text-center">
                    <button
                      className={`w-full py-2 rounded-md font-medium transition bg-purple-600 text-white hover:bg-purple-700`}
                      onClick={() => {
                        console.log(plan);
                        router.push(`/payment/${plan.id}`);
                      }}
                    >
                      Chọn gói
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
