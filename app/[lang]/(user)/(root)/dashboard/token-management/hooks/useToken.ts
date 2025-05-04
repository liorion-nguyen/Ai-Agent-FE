import { chatbotApi } from "@/services/endpoints";
import { APIErrorHandler } from "@/services/types";
import { ChatbotTokenResponse, CreateChatbotTokenParams } from "@/services/types/chatbot";
import { useToast } from "@/shared/hooks";
import useChatbotStore from "@/store/chatbot";
import { useMutation } from "@tanstack/react-query";

export const useGetTokens = () => {
    const { toast } = useToast();
    const { setChatbotTokens, setChatbotToken } = useChatbotStore();
    const {
        mutate,
        isPending: loading,
        error,
    } = useMutation<ChatbotTokenResponse, APIErrorHandler>({
        mutationFn: () => chatbotApi.getChatbotTokens(),
        onSuccess: (data) => {
            setChatbotTokens(data.chatbotTokens);
            setChatbotToken(data.chatbotTokens[0]);
        },
        onError: (err) => {
            toast({
                title: 'Lấy chatbot token thất bại',
                description: err?.message.message,
                variant: 'destructive',
            });
        },
    });

    return {
        getChatbotTokens: mutate,
        loading,
        error,
    };
};

export const useCreateToken = () => {
    const { toast } = useToast();
    const { getChatbotTokens } = useGetTokens();
    const {
        mutate,
        isPending: loading,
        error,
    } = useMutation<CreateChatbotTokenParams, APIErrorHandler, string>({
        mutationFn: (chatbot_id: string) => chatbotApi.createChatbotToken(chatbot_id),
        onSuccess: (data) => {
            toast({
                title: 'Tạo chatbot token thành công',
                description: 'Chatbot token đã được tạo thành công',
                variant: 'default',
            });
            getChatbotTokens();
        },
        onError: (err) => {
            toast({
                title: 'Tạo chatbot token thất bại',
                description: err?.message.message,
                variant: 'destructive',
            });
        },
    });

    return {
        createChatbotToken: mutate,
        loading,
        error,
    };
};