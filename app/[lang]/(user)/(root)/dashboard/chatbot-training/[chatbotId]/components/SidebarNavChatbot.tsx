'use client';

import useChatbotStore from '@/store/chatbot';
import {
  BotMessageSquare,
  ChevronDown,
  ChevronLeft,
  Code,
  Database,
  FileText,
  GitBranch,
  Globe,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetChatbot } from '../../hooks/useChatbot';
interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Tùy chọn',
    items: [
      {
        title: 'Tổng quan',
        url: '/dashboard/chatbot-training/[chatbotId]/overview',
        icon: FileText,
      },
      {
        title: 'Thư viện ảnh',
        url: '/dashboard/chatbot-training/[chatbotId]/image-library',
        icon: ImageIcon,
        badge: 'New',
      },
    ],
  },
  {
    label: 'Dữ liệu',
    items: [
      {
        title: 'Dữ liệu huấn luyện',
        url: '/dashboard/chatbot-training/[chatbotId]/training-data',
        icon: Database,
      },
    ],
  },
  {
    label: 'Operation',
    items: [
      {
        title: 'Kịch bản chốt sales',
        url: '/dashboard/chatbot-training/[chatbotId]/sales-script',
        icon: GitBranch,
      },
    ],
  },
  {
    label: 'Development',
    items: [
      {
        title: 'Tool Ads Facebook',
        url: '/dashboard/chatbot-training/[chatbotId]/facebook-ads',
        icon: Code,
      },
      {
        title: 'Tích hợp Website',
        url: '/dashboard/chatbot-training/[chatbotId]/iframe-website',
        icon: Globe,
      },
      {
        title: 'Tích hợp nền tảng',
        url: '/dashboard/chatbot-training/[chatbotId]/integrations',
        icon: Code,
      },
    ],
  },
];

const CustomChatbotSidebar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const chatbotId = params.chatbotId || 'bot-demo';
  const { hydrated, chatbot } = useChatbotStore();
  const { getChatbot } = useGetChatbot();
  useEffect(() => {
    if (!hydrated) return;

    if (!chatbot || chatbot.id !== chatbotId) {
      getChatbot(chatbotId as string);
    }
  }, [hydrated, getChatbot, chatbotId, chatbot]);

  const handleChatClick = () => {
    console.log('Chat với chatbot:', chatbotId);
    // Thêm logic để mở giao diện chat
  };

  const handleBackClick = () => {
    router.push('/dashboard/chatbot-training');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <button
          onClick={handleBackClick}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Image
          width={32}
          height={32}
          src={chatbot?.thumbnail || '/icons/admin_icon.png'}
          alt="Chatbot Avatar"
          className="w-8 h-8 rounded-full"
        />
        <h2 className="text-base font-semibold text-gray-800">
          {chatbot?.chatbot_name}
        </h2>
        <button className="text-gray-600 hover:text-gray-800 ml-auto">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Nút Chat với */}
      <div className="p-4">
        <button
          onClick={handleChatClick}
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
        >
          Chat với
          <BotMessageSquare color="white" />
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {sidebarGroups.map((group) => (
          <div key={group.label} className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              {group.label}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const url = item.url.replace(
                  '[chatbotId]',
                  chatbotId as string,
                );
                const isActive = pathname.includes(url);

                return (
                  <li key={item.title}>
                    <a
                      href={url}
                      className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                        isActive
                          ? 'bg-purple-50 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ItemIcon className="w-5 h-5 text-gray-500" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CustomChatbotSidebar;
