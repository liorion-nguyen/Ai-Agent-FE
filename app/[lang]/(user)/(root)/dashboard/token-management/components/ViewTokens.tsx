'use client';
import { useGetTokens } from "@/app/[lang]/(user)/(root)/dashboard/token-management/hooks/useToken";
import { ChatbotToken } from "@/shared/types/chatbot";
import { formatDateTime } from "@/shared/utils";
import useChatbotStore from "@/store/chatbot";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewTokens() {
  const { chatbotTokens } = useChatbotStore();
  const { getChatbotTokens } = useGetTokens();
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  useEffect(() => {
    getChatbotTokens();
  }, [getChatbotTokens]);

  const handleCopyToken = async (token: string, id: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedTokenId(id);
      setTimeout(() => setCopiedTokenId(null), 2000); // Reset thông báo sau 2 giây
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Token</h1>
      {chatbotTokens.length === 0 ? (
        <p className="text-gray-500">Chưa có token nào được tạo.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Token</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Trạng Thái</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Hết Hạn</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Ngày Tạo</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Cập Nhật</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {chatbotTokens.map((token: ChatbotToken) => (
                <tr key={token.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 border-b">{token.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b truncate max-w-xs" title={token.token}>
                    {token.token.substring(0, 30)}...
                  </td>
                  <td className="py-3 px-4 text-sm border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        token.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {token.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b">{formatDateTime(token.expires_at)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b">{formatDateTime(token.created_at)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b">{formatDateTime(token.updated_at)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b">
                    <button
                      onClick={() => handleCopyToken(token.token, token.id)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                      title="Sao chép token"
                    >
                      <Copy size={16} />
                      {copiedTokenId === token.id && (
                        <span className="text-green-600 text-xs">Đã sao chép!</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}