import { useGetScriptIframe } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/iframe-website/hooks/useScriptIframe';
import { useGetSelectDomain } from '@/shared/hooks';
import { Domain } from '@/shared/types';
import useDomainStore from '@/store/domain';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function ChatbotDomainForm() {
  const { domain, domains, setDomain } = useDomainStore();
  const { getDomain } = useGetSelectDomain();
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [dataDomains, setDataDomains] = useState<Domain[]>([]);
  const { getScriptIframe, loading } = useGetScriptIframe();
  const { chatbotId } = useParams<{ chatbotId: string }>();
  useEffect(() => {
    getDomain();
  }, [getDomain]);

  useEffect(() => {
    if (domain) {
      setSelectedDomain(domain.id);
    }
  }, [domain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = domains.find((t) => t.id === selectedDomain);
    if (domain) {
      setDomain(domain);
      getScriptIframe({
        domainId: domain.id,
        chatbotId: chatbotId,
      });
    }
  };
  useEffect(() => {
    setDataDomains(domains.filter((t) => t.isVerified));
  }, [domains]);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Domain</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>
            Chọn một domain
          </option>
          {dataDomains.map((domain: Domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name.substring(0, 30)}... (ID: {domain.id})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!selectedDomain || loading}
        className={`px-4 py-2 rounded-lg text-white ${
          selectedDomain
            ? 'bg-purple-500 hover:bg-purple-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {loading ? 'Đang xử lý...' : 'Xác nhận'}
      </button>
    </form>
  );
}
