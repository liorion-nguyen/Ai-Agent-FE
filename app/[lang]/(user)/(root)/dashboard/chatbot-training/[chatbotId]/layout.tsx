'use client';

import { ReactNode } from 'react';
import CustomChatbotSidebar from './components/SidebarNavChatbot';

interface ChatbotTrainingLayoutProps {
  children: ReactNode;
}

export default function ChatbotTrainingLayout({
  children,
}: ChatbotTrainingLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <CustomChatbotSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 flex flex-col bg-muted">{children}</main>
    </div>
  );
}
