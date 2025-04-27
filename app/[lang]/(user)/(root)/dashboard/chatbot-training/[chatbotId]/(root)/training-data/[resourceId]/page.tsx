'use client';

import { ToolbarButton } from '@/components/ui/ToolbarButton';
import useResourceStore from '@/store/resource';
import { Upload } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetResource } from '../hooks/useResource';
import ModalUploadKnowledge from './components/ModalUploadKnowledge';

export default function TrainingDataDetailPage() {
  const { resourceId } = useParams();
  const { hydrated, resource } = useResourceStore();
  const { getResource } = useGetResource();
  const [isOpenUploadKnowledge, setIsOpenUploadKnowledge] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    if (!resource || resource.id !== resourceId) {
      getResource(resourceId as string);
    }
  }, [hydrated, resource, resourceId, getResource]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 shadow-sm h-[65px]">
        <h3 className="text-xl font-bold text-gray-800">{resource?.name}</h3>
        <ToolbarButton
          label="Upload Knowledge"
          icon={<Upload className="w-4 h-4" />}
          onClick={() => setIsOpenUploadKnowledge(true)}
        />
        <ModalUploadKnowledge
          isOpen={isOpenUploadKnowledge}
          setIsOpen={setIsOpenUploadKnowledge}
        />
      </div>

      {/* Main Content */}
      <div className="p-6"></div>
    </div>
  );
}
