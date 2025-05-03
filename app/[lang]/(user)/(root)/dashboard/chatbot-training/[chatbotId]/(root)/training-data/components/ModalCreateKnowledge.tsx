'use client';

import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal'; // Import Modal
import { useZodForm } from '@/shared/hooks';
import { createResourceSchema } from '@/shared/validations/resource/resource.schema';
import {
  File,
  FileImage,
  FilePlus,
  FileText,
  FileX,
  Globe,
  LetterText,
  Upload,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateResource } from '../hooks/useResource';
// Zod Schema

// Types
interface CreateResourceType {
  resource_name: string;
  description?: string;
  external_type_name: 'text' | 'image';
  import_type: 'local' | 'online' | 'notion' | 'google' | 'lark' | 'custom';
  icon?: string;
}

interface ModalCreateKnowledgeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateKnowledge = ({
  isOpen,
  setIsOpen,
}: ModalCreateKnowledgeProps) => {
  const router = useRouter();
  const [selectedExternalTypeName, setSelectedExternalTypeName] = useState<
    'text' | 'image'
  >('text');
  const [selectedImportType, setSelectedImportType] = useState<
    'local' | 'online' | 'notion' | 'google' | 'lark' | 'custom'
  >('local');

  const { createResource, loading } = useCreateResource();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useZodForm(createResourceSchema, {
    defaultValues: {
      resource_name: '',
      description: '',
      external_type_name: 'text',
      import_type: 'local',
      icon: '',
    },
  });

  const onSubmit = async (values: CreateResourceType) => {
    const res = await createResource(values);
    if (res.id) {
      setIsOpen(false);
      router.push(`/dashboard/resource/${res.id}`);
    }
  };

  const formatOptions = [
    {
      value: 'text',
      label: 'Text format',
      icon: <LetterText className="w-5 h-5 text-gray-500" />,
    },
    {
      value: 'image',
      label: 'Image format',
      icon: <FileImage className="w-5 h-5 text-gray-500" />,
    },
  ];

  const importTypeOptions = [
    {
      value: 'local',
      label: 'Local documents',
      desc: 'Upload local files',
      icon: File,
    },
    {
      value: 'online',
      label: 'Online data',
      desc: 'Obtain data on web pages',
      icon: Globe,
    },
    {
      value: 'notion',
      label: 'Notion',
      desc: 'Import Notion pages',
      icon: FileText,
    },
    {
      value: 'google',
      label: 'Google Doc',
      desc: 'Import Google Docs',
      icon: FileText,
    },
    {
      value: 'lark',
      label: 'Lark',
      desc: 'Import Lark documents',
      icon: FileX,
    },
    {
      value: 'custom',
      label: 'Custom',
      desc: 'Custom content',
      icon: FilePlus,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalHeader>
        <ModalTitle>Create Knowledge</ModalTitle>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <div className="grid grid-cols-2 gap-4">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelectedExternalTypeName(
                      option.value as 'text' | 'image',
                    );
                    setValue(
                      'external_type_name',
                      option.value as 'text' | 'image',
                    );
                  }}
                  className={`
                  flex flex-col items-center p-4 rounded-lg border transition-colors gap-2
                  ${
                    selectedExternalTypeName === option.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
                  disabled={option.value === 'image'}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
            {errors.external_type_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.external_type_name.message}
              </p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the knowledge name"
              {...register('resource_name')}
              maxLength={100}
              className="w-full px-3 py-2 rounded-md border"
            />
            {errors.resource_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.resource_name.message}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter the content of the dataset"
              {...register('description')}
              maxLength={2000}
              rows={4}
              className="w-full px-3 py-2 rounded-md border"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Import Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Import Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {importTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelectedImportType(
                      option.value as
                        | 'local'
                        | 'online'
                        | 'notion'
                        | 'google'
                        | 'lark'
                        | 'custom',
                    );
                    setValue(
                      'import_type',
                      option.value as
                        | 'local'
                        | 'online'
                        | 'notion'
                        | 'google'
                        | 'lark'
                        | 'custom',
                    );
                  }}
                  className={`
                  flex items-center p-4 rounded-lg border transition-colors
                  ${
                    selectedImportType === option.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
                >
                  <option.icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.import_type && (
              <p className="text-sm text-red-500 mt-1">
                {errors.import_type.message}
              </p>
            )}
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setValue('icon', '/assets/temp/icons/docs.png')}
                className="px-3 py-2 text-sm text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Upload className="w-5 h-5 text-purple-600" />
                Change
              </button>
            </div>
            {errors.icon && (
              <p className="text-sm text-red-500 mt-1">{errors.icon.message}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <ModalButton
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create and Import'}
            </ModalButton>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateKnowledge;
