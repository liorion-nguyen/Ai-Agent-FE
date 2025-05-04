'use client';

import { useGetChatbot } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import Empty from '@/components/ui/Empty';
import { ModalButton } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ToolbarButton } from '@/components/ui/ToolbarButton';
import { Chatbot } from '@/shared/types/chatbot';
import useChatbotStore from '@/store/chatbot';
import {
  ArrowDownUp,
  Download,
  HelpCircle,
  Inbox,
  Plus,
  Upload,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import ModalAddKnowledge from './components/ModalAddKnowledge';
import ModalCreateKnowledge from './components/ModalCreateKnowledge';
import ResourceItem from './components/ResourceItem';

export default function TrainingDataPage() {
  const params = useParams();
  const router = useRouter();
  const chatbotId = params.chatbotId || 'bot-demo';
  const { chatbot } = useChatbotStore();
  const { getChatbot, loading } = useGetChatbot();
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  useLayoutEffect(() => {
    getChatbot(chatbotId as string);
  }, [getChatbot, chatbotId]);

  const handleHowToClick = () => {
    console.log('Clicked: How to add questions');
  };

  const handleExportClick = () => {
    console.log('Clicked: Export file');
  };

  const handleImportClick = () => {
    setIsOpenImportModal(true);
  };

  const handleAddClick = () => {
    setIsOpenAddModal(true);
  };

  const handleClick = (resourceId: string) => {
    router.push(`/dashboard/resource/${resourceId}`);
  };

  const handleSettingsClick = (resourceName: string) => {
    console.log('Clicked: Resource Name', resourceName);
  };

  const handleDeleteClick = (resourceId: string) => {
    console.log('Clicked: Delete Resource ID', resourceId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 shadow-sm h-[65px]">
        <h3 className="text-xl font-bold text-gray-800">Training Data</h3>
        <div className="flex items-center gap-2">
          <ToolbarButton
            label="Sort By"
            icon={<ArrowDownUp className="w-4 h-4" />}
          />
          <button className="text-sm font-medium text-purple-600 hover:bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
            Newest
          </button>
          <button className="text-sm font-medium text-purple-600 hover:bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
            Oldest
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-h-[calc(100vh-65px)] overflow-y-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-md font-medium text-gray-900">
            FAQs ({chatbot?.chatbot_resources.length})
          </span>
          <div className="flex items-center gap-3">
            <ToolbarButton
              label="How to Add FAQs"
              icon={<HelpCircle className="w-4 h-4" />}
              onClick={handleHowToClick}
            />
            <ToolbarButton
              label="Export"
              icon={<Download className="w-4 h-4" />}
              onClick={handleExportClick}
            />
            <ModalButton
              variant="primary"
              size="sm"
              onClick={handleImportClick}
              className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
            >
              <Upload className="w-4 h-4" />
              Import FAQs
            </ModalButton>
            <ModalCreateKnowledge
              isOpen={isOpenImportModal}
              setIsOpen={setIsOpenImportModal}
            />
            <ModalButton
              variant="primary"
              size="sm"
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              Add FAQs
            </ModalButton>
            <ModalAddKnowledge
              chatbot={chatbot as Chatbot}
              isOpen={isOpenAddModal}
              onClose={() => setIsOpenAddModal(false)}
              onSuccess={() => {
                setIsOpenAddModal(false);
                getChatbot(chatbotId as string);
              }}
            />
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))
          ) : chatbot?.chatbot_resources.length &&
            chatbot?.chatbot_resources.length > 0 ? (
            chatbot?.chatbot_resources.map((resource) => (
              <ResourceItem
                key={resource.resource.id}
                id={resource.resource.id}
                name={resource.resource.name}
                description={resource.resource.description}
                lastUpdated={resource.resource.updated_at || ''}
                status={resource.resource.status}
                externalTypeName={resource.resource.external_type_name}
                onClick={() => handleClick(resource.resource.id)}
                onSettingsClick={() =>
                  handleSettingsClick(resource.resource.name)
                }
                onDeleteClick={() => handleDeleteClick(resource.id)}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Empty
                icon={<Inbox className="w-12 h-12 text-gray-400" />}
                description="No data available. Click 'Add FAQs' to start building your AI Chatbot."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
