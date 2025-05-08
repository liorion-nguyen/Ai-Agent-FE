'use client';

import { useUploadFile } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/training-data/hooks/useResource';
import { Modal, ModalButton } from '@/components/ui/Modal';
import { toast, useZodForm } from '@/shared/hooks';
import { uploadFileSchema } from '@/shared/validations/resource/resource.schema';
import { FileText, Upload } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface ModalUploadKnowledgeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}

const ModalUploadKnowledge = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: ModalUploadKnowledgeProps) => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const { uploadFile, loading } = useUploadFile();

  const [fileName, setFileName] = useState<string>('');

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useZodForm(uploadFileSchema, {
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: { file?: File | undefined }) => {
    if (!data.file) {
      toast({
        title: 'Error',
        description: 'No file selected.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const res = await uploadFile({
        file: data.file,
        resource_id: resourceId,
      });
      if (res.success) {
        toast({
          title: 'Success',
          description: 'File uploaded successfully.',
          variant: 'default',
        });
        setIsOpen(false);
        onSuccess();
        reset();
      } else {
        throw new Error('Upload failed.');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err instanceof Error
            ? err.message
            : 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('Selected file:', file);
    const allowedFormats = ['.pdf', '.txt', '.doc', '.docx', '.md'];
    const maxSize = 100 * 1024 * 1024;

    if (file) {
      const fileExtension = file.name
        .slice(file.name.lastIndexOf('.'))
        .toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        toast({
          title: 'Invalid file format',
          description: 'Only PDF, TXT, DOC, DOCX, or MD files are allowed.',
          variant: 'destructive',
        });
        reset({ file: undefined });
        setFileName('');
        return;
      }
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'File size must not exceed 100MB.',
          variant: 'destructive',
        });
        reset({ file: undefined });
        setFileName('');
        return;
      }
      setValue('file', file, { shouldValidate: true });
      setFileName(file.name);
    } else {
      reset({ file: undefined });
      setFileName('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Upload Knowledge"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload File</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx,.md"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Upload className="w-6 h-6 text-purple-500" />
              <p className="text-purple-500 font-medium">
                Click to upload or drag and drop a file
              </p>
              <p className="text-sm text-gray-500">
                Only one file allowed in PDF, TXT, DOC, DOCX, or MD format.
                Maximum file size: 100MB. PDF files can contain up to 500 pages.
              </p>
              {fileName && (
                <div className="flex items-center gap-2 mt-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{fileName}</span>
                </div>
              )}
            </label>
          </div>
          {errors.file && (
            <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>
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
            disabled={loading || !fileName}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUploadKnowledge;
