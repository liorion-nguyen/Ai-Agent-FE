'use client';

import Img from '@/components/ui/Image';
import {
    Modal,
    ModalBody,
    ModalButton,
    ModalCloseButton,
    ModalHeader,
    ModalTitle,
} from '@/components/ui/Modal';
import { useToast } from '@/shared/hooks';
import { Chatbot } from '@/shared/types/chatbot';
import { Resource } from '@/shared/types/resource';
import { formatDate } from '@/shared/utils/date';
import useResourceStore from '@/store/resource';
import { ArrowLeftRight, BookOpenText, BotMessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAddResourceToChatbot, useGetResources } from '../hooks/useResource';
interface ModalAddKnowledgeProps {
    isOpen: boolean;
    onClose: () => void;
    chatbot: Chatbot;
}

export default function ModalAddKnowledge({ chatbot, isOpen, onClose }: ModalAddKnowledgeProps) {
    const { resources, hydrated } = useResourceStore();
    const { getAllResources, loading } = useGetResources();
    const { addResourceToChatbot, loading: adding } = useAddResourceToChatbot();

    const { toast } = useToast();

    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    useEffect(() => {
        if (!hydrated) return;
        if (!resources.length) {
            getAllResources();
        }
    }, [hydrated, resources, getAllResources]);

    const handleAddResource = async () => {
        if (!selectedResource) return;

        try {
              await addResourceToChatbot({
                chatbot_id: chatbot.id,
                dataset_ids: [selectedResource.external_resource_id],
                auto_call: true,
                search_strategy: 1,
              });

            toast({
                title: 'Success',
                description: `Resource "${selectedResource.name}" added to chatbot "${chatbot.chatbot_name}".`,
                variant: 'default',
            });

            onClose(); // Close the modal on success
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add resource to chatbot. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalHeader>
                <ModalTitle>Thêm kiến thức mới</ModalTitle>
                <ModalCloseButton onClick={onClose} />
            </ModalHeader>
            <ModalBody>
                <p className="text-sm text-gray-500 mb-4">
                    Thêm kiến thức mới vào chatbot để tạo câu trả lời cho chatbot chuẩn xác hơn
                </p>

                <div className="flex items-center gap-4 mb-6">
                    {/* Resource Selection */}
                    <div className="w-1/2">
                        <label
                            htmlFor="resources"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Chọn kiến thức
                        </label>
                        <select
                            id="resources"
                            value={selectedResource?.id || ''}
                            onChange={(e) =>
                                setSelectedResource(
                                    resources.find((resource) => resource.id === e.target.value) || null
                                )
                            }
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-900"
                            disabled={loading}
                        >
                            <option value="">Chọn kiến thức</option>
                            {resources.map((resource) => (
                                <option key={resource.id} value={resource.id}>
                                    {resource.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowLeftRight className="w-6 h-6 text-gray-400" />

                    {/* Chatbot Preview */}
                    <div className="w-1/2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {chatbot.icon_url ? (
                            <Img
                                src={chatbot.icon_url}
                                alt={chatbot.chatbot_name}
                                className="w-10 h-10 rounded-full"
                            />
                        ) : (
                            <BotMessageSquare className="w-10 h-10 text-gray-400" />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {chatbot.chatbot_name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {selectedResource
                                    ? `Will be updated with "${selectedResource.name}"`
                                    : 'Select a resource to add'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Selected Resource Preview (Optional) */}
                {selectedResource && (
                    <div className="p-4 bg-white border border-gray-200 rounded-lg mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 text-center">
                            Selected Resource Details
                        </h4>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {
                                selectedResource.external_icon_url ? <Img src={selectedResource.external_icon_url} alt={selectedResource.name} className="w-10 h-10 rounded-full" /> : <BookOpenText size={48} className="text-gray-400" />
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <div>
                                <p>
                                    <span className="font-medium">Name:</span> {selectedResource.name}
                                </p>
                                <p>
                                    <span className="font-medium">Description:</span>{' '}
                                    {selectedResource.description || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-medium">Status:</span> {selectedResource.status}
                                </p>
                                <p>
                                    <span className="font-medium">Documents:</span>{' '}
                                    {selectedResource.documents?.length || 0}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">External Type:</span>{' '}
                                    {selectedResource.external_type || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-medium">External Type Name:</span>{' '}
                                    {selectedResource.external_type_name || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-medium">Created At:</span>{' '}
                                    {selectedResource.created_at ? formatDate(selectedResource.created_at) : 'N/A'}
                                </p>
                                <p>
                                    <span className="font-medium">Updated At:</span>{' '}
                                    {selectedResource.updated_at ? formatDate(selectedResource.updated_at) : 'N/A'}
                                </p>
                                {selectedResource.external_icon_url && (
                                    <p>
                                        <span className="font-medium">Icon:</span>{' '}
                                        <Img
                                            src={selectedResource.external_icon_url}
                                            alt="Resource Icon"
                                            className="w-6 h-6 inline-block"
                                        />
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer with Add Button */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <ModalButton
                        onClick={handleAddResource}
                        disabled={!selectedResource || adding}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                        {adding ? 'Adding...' : 'Add Resource'}
                        Add Resource
                    </ModalButton>
                </div>
            </ModalBody>
        </Modal>
    );
}