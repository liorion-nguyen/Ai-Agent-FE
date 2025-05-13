'use client';

import useSubscriptionStore from '@/store/subscription';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { BookText, Bot, MessageSquare, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatItem {
  label: string;
  value: number;
  total: number;
  icon: React.ElementType;
}

const BoxChart = () => {
  const { subscription, remainingLimits } = useSubscriptionStore();
  const [statsData, setStatsData] = useState<StatItem[]>([]);
  useEffect(() => {
    if (subscription) {
      setStatsData([
        {
          label: 'Tài liệu',
          value:
            subscription.subscription.knowledge_limit -
            (remainingLimits?.knowledge || 0),
          total: subscription.subscription.knowledge_limit,
          icon: BookText,
        },
        {
          label: 'Thành viên',
          value:
            subscription.subscription.member_limit -
            (remainingLimits?.member || 0),
          total: subscription.subscription.member_limit,
          icon: User,
        },
        {
          label: 'Cuộc hội thoại',
          value:
            subscription.subscription.message_limit -
            (remainingLimits?.message || 0),
          total: subscription.subscription.message_limit,
          icon: MessageSquare,
        },
        {
          label: 'Chatbot',
          value:
            subscription.subscription.agent_limit -
            (remainingLimits?.agent || 0),
          total: subscription.subscription.agent_limit,
          icon: Bot,
        },
      ]);
    }
  }, [subscription]);

  const getChartData = (value: number, total: number) => ({
    labels: ['Đã sử dụng', 'Còn lại'],
    datasets: [
      {
        data: [value, total - value],
        backgroundColor: [
          value === total ? '#c72b2be8' : '#b39537e8',
          value === total ? '#c72b2be8' : '#D1D5DB',
        ],
        borderWidth: 0,
      },
    ],
  });

  const chartOptions = {
    cutout: '80%', // Độ dày của vòng tròn (tạo hiệu ứng Doughnut)
    plugins: {
      legend: {
        display: false, // Ẩn legend
      },
      tooltip: {
        enabled: false, // Ẩn tooltip
      },
    },
  };

  return (
    <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg"
        >
          {/* Icon */}
          <stat.icon className="w-8 h-8" />

          {/* Nội dung và biểu đồ */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700">{stat.label}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Tổng số {stat.label.toLowerCase()} {stat.value}/{stat.total}{' '}
              {stat.label.toLowerCase()}
            </p>
            <div className="relative w-24 h-24 mx-auto mt-2">
              <Doughnut
                data={getChartData(stat.value, stat.total)}
                options={chartOptions}
              />
              {/* Số liệu ở giữa biểu đồ */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-700">
                  {stat.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxChart;
