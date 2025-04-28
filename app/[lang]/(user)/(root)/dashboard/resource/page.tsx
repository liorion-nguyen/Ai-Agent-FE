'use client';

import Empty from '@/components/ui/Empty';
import { ModalButton } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import useResourceStore from '@/store/resource';
import { Inbox, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModalCreateKnowledge from '../chatbot-training/[chatbotId]/(root)/training-data/components/ModalCreateKnowledge';
import ResourceItem from '../chatbot-training/[chatbotId]/(root)/training-data/components/ResourceItem';
import { useGetResources } from '../chatbot-training/[chatbotId]/(root)/training-data/hooks/useResource';
export default function WorkspaceLibraryPage() {
  const { resources, hydrated } = useResourceStore();
  const { getAllResources, loading: resourcesLoading } = useGetResources();

  const [typeFilter, setTypeFilter] = useState<string>('All Types');
  const [timeFilter, setTimeFilter] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    getAllResources();
    // if (!resources.length) {
    // }
  }, [hydrated, resources, getAllResources]);

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCreateResource = () => {
    setIsOpenCreateModal(true);
  };

  const filteredResources = [
    ...resources,
    ...resources.map((resource) => ({
      id: resource.id,
      name: resource.name,
      external_type_name: resource.external_type_name,
      updated_at: resource.updated_at,
      status: 'active',
      description: '', // Add description if available
    })),
  ].filter((resource) => {
    const matchesType = typeFilter === 'All Types' || resource.external_type_name === typeFilter;
    const matchesSearch = resource.name.toLowerCase().includes(searchText.toLowerCase());
    // Add time filter logic if needed (e.g., Last 7 days, Last 30 days)
    return matchesType && matchesSearch;
  });

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 shadow-sm h-[65px]">
        <h3 className="text-xl font-bold text-gray-800">Library</h3>
        <div className="flex items-center gap-2">
          <ModalButton
            variant="primary"
            size="sm"
            onClick={handleCreateResource}
            className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </ModalButton>
          <ModalCreateKnowledge
            isOpen={isOpenCreateModal}
            setIsOpen={setIsOpenCreateModal}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-65px)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-md font-medium text-gray-900">
            Resources ({filteredResources.length})
          </span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources"
                value={searchText}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => handleTypeFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All Types">All Types</option>
              <option value="Workflow">Workflow</option>
              <option value="Prompt">Prompt</option>
              <option value="Knowledge">Knowledge</option>
            </select>
            <select
              value={timeFilter}
              onChange={(e) => handleTimeFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
            </select>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourcesLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))
          ) : filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceItem
                key={resource.id}
                id={resource.id}
                name={resource.name}
                description={resource.description || 'No description available'}
                lastUpdated={resource.updated_at || ''}
                status={resource.status}
                externalTypeName={resource.external_type_name}
                onClick={() =>
                  // resource.external_type_name === 'Prompt'
                  //   ? console.log('View Prompt:', resource.id) 
                  //   : console.log('View Resource:', resource.id)
                  router.push(`/dashboard/resource/${resource.id}`)
                }
                onSettingsClick={() => console.log('Settings for:', resource.name)}
                onDeleteClick={() => console.log('Delete:', resource.id)}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Empty
                icon={<Inbox className="w-12 h-12 text-gray-400" />}
                description="No resources available. Click 'Add Resource' to start building your library."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}