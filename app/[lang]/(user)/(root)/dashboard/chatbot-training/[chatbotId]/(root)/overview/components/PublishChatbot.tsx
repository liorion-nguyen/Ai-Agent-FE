import { usePublishChatbot } from "@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/overview/hooks/useUpdateChatbot";
import useChatbotStore from "@/store/chatbot";
import useUserStore from "@/store/user";
export default function PublishChatbot() {
    const { chatbot } = useChatbotStore();
    const { user, apiToken } = useUserStore();
    const { publishChatbot } = usePublishChatbot();

    const handlePublishChatbot = async () => {
        publishChatbot({
            user_id: user?.id || '',
            connector_id: chatbot?.connector_id || '',
            api_token: apiToken || '',
            chatbot_id: chatbot?.id || '',
        })
    }
    return (
        <div>
            {
                chatbot?.status === 'draft' &&
                <button className="bg-purple-500 text-white px-4 py-2 rounded-md" onClick={() => handlePublishChatbot()}>
                    Publish
                </button>
            }
        </div>
    )
}