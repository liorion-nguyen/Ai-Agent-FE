'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { BookOpen, BookText, MessageSquare, User } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface StatItem {
  label: string;
  value: number;
  total: number;
  icon: React.ElementType; // Đường dẫn đến icon
}

const statsData: StatItem[] = [
  {
    label: 'Tài liệu',
    value: 5,
    total: 20,
    icon: BookText, // Thay bằng icon thực tế
  },
  {
    label: 'Thành viên',
    value: 0,
    total: 11,
    icon: User,
  },
  {
    label: 'Cuộc hội thoại',
    value: 0,
    total: 2000,
    icon: MessageSquare,
  },
  {
    label: 'Trang',
    value: 0,
    total: 1,
    icon: BookOpen,
  },
];

const UsageLimitsPage = () => {
  // Cấu hình dữ liệu cho biểu đồ Doughnut
  const getChartData = (value: number, total: number) => ({
    labels: ['Đã sử dụng', 'Còn lại'],
    datasets: [
      {
        data: [value, total - value],
        backgroundColor: ['#E5E7EB', '#D1D5DB'], // Màu xám nhạt giống trong ảnh
        borderWidth: 0,
      },
    ],
  });

  // Tùy chọn cho biểu đồ
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
    <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md">
      {statsData.map((stat, index) => (
        <div key={index} className="flex items-center gap-4">
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

export default UsageLimitsPage;
