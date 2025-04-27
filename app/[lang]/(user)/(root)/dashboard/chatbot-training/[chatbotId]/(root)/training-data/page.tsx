'use client';

import Empty from '@/components/ui/Empty';
import { ModalButton } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ToolbarButton } from '@/components/ui/ToolbarButton';
import useResourceStore from '@/store/resource';
import {
  ArrowDownUp,
  Download,
  HelpCircle,
  Inbox,
  Plus,
  Upload,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalCreateKnowledge from './components/ModalCreateKnowledge';
import ResourceItem from './components/ResourceItem';
import { useGetResources } from './hooks/useResource';

export default function TrainingDataPage() {
  const { resources, hydrated } = useResourceStore();
  const { getAllResources, loading } = useGetResources();
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  useEffect(() => {
    if (!hydrated) return;
    getAllResources();
    // if (resources.length === 0) {
    // }
  }, [hydrated, getAllResources]);

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
    console.log('Clicked: Add FAQs');
  };

  const handleClick = (resourceId: string) => {
    console.log('Clicked: Resource ID', resourceId);
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
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-md font-medium text-gray-900">
            FAQs ({resources.length})
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
              <ModalCreateKnowledge
                isOpen={isOpenImportModal}
                setIsOpen={setIsOpenImportModal}
              />
            </ModalButton>
            <ModalButton
              variant="primary"
              size="sm"
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              Add FAQs
            </ModalButton>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))
          ) : resources.length > 0 ? (
            resources.map((resource) => (
              <ResourceItem
                key={resource.id}
                id={resource.id}
                name={resource.name}
                description={resource.description}
                lastUpdated={resource.updated_at || ''}
                status={resource.status}
                externalTypeName={resource.external_type_name}
                onClick={() => handleClick(resource.id)}
                onSettingsClick={() => handleSettingsClick(resource.name)}
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
