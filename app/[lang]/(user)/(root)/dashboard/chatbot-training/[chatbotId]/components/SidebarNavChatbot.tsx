'use client';

import { useGetChatbot } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import useChatbotStore from '@/store/chatbot';
import {
  BotMessageSquare,
  Braces,
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
import { useEffect, useState } from 'react';
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
        title: 'Quản lý token',
        url: '/dashboard/chatbot-training/[chatbotId]/token-management',
        icon: Braces,
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
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const pathname = usePathname();
  const { hydrated, chatbot, chatbots } = useChatbotStore();
  const { getChatbot } = useGetChatbot();
  useEffect(() => {
    if (!hydrated) return;
    if (!chatbot || chatbot.id !== chatbotId) {
      getChatbot(chatbotId);
    }
  }, [hydrated, getChatbot, chatbotId, chatbot]);

  const handleChatClick = () => {
    console.log('Chat với chatbot:', chatbotId);
  };

  const handleBackClick = () => {
    router.push('/dashboard/chatbot-training');
  };

  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? chatbots : chatbots.slice(0, 5);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset lại nếu menu bị đóng
      setShowAll(false);
    }
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

        <DropdownMenu onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={32}
                height={32}
                src={chatbot?.thumbnail || '/icons/admin_icon.png'}
                alt="Chatbot Avatar"
                className="w-8 h-8 rounded-full"
              />
              <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                {chatbot?.chatbot_name}
              </h2>
              <ChevronDown className="w-5 h-5 text-gray-600 hover:text-gray-800 ml-auto" />
            </div>
          </DropdownMenuTrigger>

          {chatbots.length > 1 && (
            <DropdownMenuContent>
              {visibleItems.map(
                (chatbot) =>
                  chatbot.id !== chatbotId && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      key={chatbot.id}
                      onSelect={() => {
                        router.push(
                          `/dashboard/chatbot-training/${chatbot.id}`,
                        );
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={32}
                          height={32}
                          src={chatbot.thumbnail || '/icons/admin_icon.png'}
                          alt="Chatbot Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-gray-800 line-clamp-1">
                          {chatbot.chatbot_name}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ),
              )}

              {chatbots.length > 5 && !showAll && (
                <div
                  className="px-2 py-1 cursor-pointer text-blue-600 hover:underline text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(true);
                  }}
                >
                  Xem tất cả
                </div>
              )}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
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
                const url = item.url.replace('[chatbotId]', chatbotId);
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
