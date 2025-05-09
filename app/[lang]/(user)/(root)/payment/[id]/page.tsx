'use client';
import {
  useCancelSubscription,
  useGetSubscriptionById,
  useSubscribeSubscription,
} from '@/app/[lang]/hooks/useSubscription';
import { Subscription } from '@/shared/types/subscription';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import useUserStore from '@/store/user';
import { ChevronLeft, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { getSubscriptionById } = useGetSubscriptionById();
  const { user } = useUserStore();
  const { subscribeSubscription } = useSubscribeSubscription();
  const { cancelSubscription } = useCancelSubscription();

  const handleSubscribeSubscription = async (id: string) => {
    if (subscription) {
      await cancelSubscription({
        subscriptionId: subscription.id,
        userId: user?.id || '',
      });
    }
    await subscribeSubscription({ subscriptionId: id, userId: user?.id || '' });
    router.back();
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      const subscription = await getSubscriptionById(id);
      setSubscription(subscription);
    };
    fetchSubscription();
  }, [getSubscriptionById, id]);

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto mt-20">
      <div className="flex items-center gap-2">
        <ChevronLeft className="w-6 h-6" onClick={() => router.back()} />
        <h1 className="text-2xl font-bold text-gray-800">
          Thông tin xuất hóa đơn
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Thông tin của bạn
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Khách hàng:</strong> {user?.fullname}
            </p>
            {user?.phone && (
              <p>
                <strong>Số điện thoại:</strong> {user?.phone}
              </p>
            )}
            {user?.email && (
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            )}
            <p>
              <strong>Địa chỉ:</strong>{' '}
              <span className="text-purple-600 flex items-center">
                Thêm địa chỉ <Pencil className="w-4 h-4 ml-1" />
              </span>
            </p>
          </div>
          <div className="mt-4">
            <div className="border border-gray-200 rounded-lg p-2 mb-2 flex items-center">
              <input type="radio" name="payment" id="bank" className="mr-2" />
              <Image
                src="https://app.preny.ai/payment/ic_bank.svg"
                alt="Bank Logo"
                width={40}
                height={24}
                className="mr-2"
              />
              <div>
                <p className="text-gray-700">
                  Thanh toán chuyển khoản ngân hàng
                </p>
                <p className="text-orange-500 text-sm">
                  (Thời gian cập nhật gói từ 1 - 3 tiếng)
                </p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-2 flex items-center">
              <input type="radio" name="payment" id="vnpay" className="mr-2" />
              <Image
                src="https://app.preny.ai/payment/ic_vnpay.svg"
                alt="VNPAY Logo"
                width={40}
                height={24}
                className="mr-2"
              />
              <div>
                <p className="text-gray-700">Thanh toán trực tuyến VNPAY</p>
                <p className="text-orange-500 text-sm">
                  (Thời gian cập nhật gói tức thì)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Thông tin đơn hàng
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Ngày tạo:</strong> {formatDate(new Date())}
            </p>
            <p>
              <strong>Loại gói:</strong> {subscription?.name}
            </p>
            <p>
              <strong>Thời gian đăng ký:</strong>{' '}
              {subscription?.duration_months}
            </p>
            <p>
              <strong>Giá tiền:</strong>{' '}
              {formatCurrency(subscription?.price || 0)}
            </p>
          </div>
          <div className="mt-4 space-y-2 text-gray-600">
            <p>
              <strong>Tổng số tiền:</strong>{' '}
              {formatCurrency(subscription?.price || 0)}
            </p>
            <button
              className="bg-purple-700 text-white w-full py-2 rounded"
              onClick={() => handleSubscribeSubscription(id)}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
