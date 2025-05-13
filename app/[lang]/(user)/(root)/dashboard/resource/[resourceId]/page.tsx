'use client';

import { useGetResource } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/training-data/hooks/useResource';
import Empty from '@/components/ui/Empty';
import { ToolbarButton } from '@/components/ui/ToolbarButton';
import { Document } from '@/shared/types/resource';
import useResourceStore from '@/store/resource';
import { BookOpenText, ChevronLeft, File, Search, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModalUploadKnowledge from './components/ModalUploadKnowledge';

export default function TrainingDataDetailPage() {
  const router = useRouter();
  const { resourceId } = useParams<{ resourceId: string }>();
  const { resource } = useResourceStore();
  const { getResource } = useGetResource();
  const [isOpenUploadKnowledge, setIsOpenUploadKnowledge] = useState(false);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    getResource(resourceId);
    if (resource) {
      setSelectedDocument(resource.documents?.[0] || null);
    }
  }, [resourceId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredDocuments =
    resource?.documents?.filter((doc) =>
      doc.document_name.toLowerCase().includes(searchText.toLowerCase()),
    ) || [];

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 shadow-sm h-[65px]">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => router.back()}
          />
          <BookOpenText
            className="text-gray-600 bg-gray-100 rounded-md p-1"
            size={48}
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">
              {resource?.name || 'Loading...'}
            </h3>
            <p className="text-sm text-gray-500">
              {resource?.documents?.length || 0} documents
            </p>
          </div>
        </div>
        <ToolbarButton
          label="Upload Knowledge"
          icon={<Upload className="w-4 h-4" />}
          onClick={() => setIsOpenUploadKnowledge(true)}
        />
        <ModalUploadKnowledge
          isOpen={isOpenUploadKnowledge}
          setIsOpen={setIsOpenUploadKnowledge}
          onSuccess={() => {
            getResource(resourceId);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar (Document List) */}
        <div className="w-1/5 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          {/* Search Bar */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 mb-4">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              className="w-full border-none outline-none text-sm text-gray-700"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          {/* Document List Header */}
          <p className="text-sm font-medium text-gray-900 mb-2">
            Document list
          </p>

          {/* Document List */}
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <div
                key={document.id}
                className={`flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer ${selectedDocument?.id === document.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleDocumentClick(document)}
              >
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 truncate">
                    {document.document_name}
                  </span>
                </div>
                {/* {document.format_type === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )} */}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No documents found</p>
          )}
        </div>

        {/* Main Content Area */}
        <div className="w-4/5 flex flex-col bg-white">
          <div className="w-full h-[65px] border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 px-4">
              <File className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-500">
                {selectedDocument?.document_name}
              </p>
            </div>
          </div>
          <div className="text-center flex justify-center items-center h-full">
            {/* Illustration (Replace with actual image or SVG) */}
            <Empty
              icon={<File className="w-4 h-4 text-gray-500" />}
              title="No Segment yet"
              description="Please upload a document to start segmenting"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
