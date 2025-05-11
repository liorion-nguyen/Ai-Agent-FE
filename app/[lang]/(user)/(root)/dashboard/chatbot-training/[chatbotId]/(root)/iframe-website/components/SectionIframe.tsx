import { useGetChatbot } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import { toast } from '@/shared/hooks';
import useChatbotStore from '@/store/chatbot';
import { Check, Copy } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function SectionIframe() {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const { hydrated, chatbot } = useChatbotStore();
  const { getChatbot } = useGetChatbot();
  const { scriptIframe } = useChatbotStore();
  const router = useRouter();
  useEffect(() => {
    const checkPublishChatbot = async () => {
      if (!hydrated) return;
      if (chatbot?.status === 'draft') {
        toast({
          title: 'Chatbot chưa được xuất bản',
          description: 'Vui lòng xuất bản chatbot trước khi tích hợp',
          variant: 'destructive',
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.back();
      }
    };
    checkPublishChatbot();
    if (!chatbotId || chatbot?.id !== chatbotId) {
      getChatbot(chatbotId);
    }
  }, [hydrated, chatbotId, getChatbot, chatbot?.id]);
  const [copied, setCopied] = useState(false);

  const scriptCode = `
      <script>
      window.ChatbotConfig = {
          siteURL: "${siteURL}",
          token: "${scriptIframe?.token}",
          chatbotId: "${scriptIframe?.chatbotId}",
          userId: "${scriptIframe?.userId}"
      };
      </script>
      <script src="${siteURL}/embed/embed-chatbot.js" async></script>
    `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode).then(() => {
      setCopied(true);
      toast({
        title: 'Success',
        description: 'Script copied to clipboard!',
        variant: 'default',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const checkScriptIframe = useMemo(() => {
    return (
      scriptIframe?.token &&
      scriptIframe?.chatbotId &&
      scriptIframe?.userId &&
      scriptIframe?.chatbotId === chatbotId
    );
  }, [scriptIframe]);
  return (
    <div>
      {!checkScriptIframe ? (
        <div>
          <p>Hãy chọn domain để tích hợp chatbot vào website</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-base text-gray-600 mb-8">
            Add the Chatbot to your website with just a few lines of code.
            Follow the instructions below to get started.
          </p>

          {/* Phần hiển thị script nhúng */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Embed Script
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-4">
              <textarea
                value={scriptCode}
                readOnly
                rows={4}
                className="w-full font-mono text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md p-3 resize-none focus:outline-none"
              />
            </div>
          </div>

          {/* Hướng dẫn chi tiết */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Integration Guide
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Step 1: Add the Script to Your Website
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Copy the script above and paste it into your HTML file,
                  preferably just before the closing{' '}
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                    {'</body>'}
                  </code>{' '}
                  tag. This ensures the chatbot loads after your page content.
                </p>
                <p className="text-sm text-gray-600 mb-2">Example:</p>
                <pre className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                  {`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Your Website</title>
                    </head>
                    <body>
                      <h1>Welcome to My Website</h1>
                      <!-- Add the script here -->
                      <script>
                      window.ChatbotConfig = {
                      siteURL: "${siteURL}"
                      };
                      </script>
                      <script src="${siteURL}/embed/embed-chatbot.js" async></script>
                    </body>
                    </html>`}
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Step 2: Verify the Chatbot
                </h3>
                <p className="text-sm text-gray-600">
                  After adding the script, refresh your website. You should see
                  a blue chat icon in the bottom-right corner of the page. Click
                  on it to open the L-Edu Chatbot.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Troubleshooting
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>
                    Ensure the script URL (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      {`${siteURL}/embed/embed-chatbot.js`}
                    </code>
                    ) is accessible. If you are using a production domain,
                    replace{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      {'http://localhost:3000'}
                    </code>{' '}
                    with your actual domain.
                  </li>
                  <li>
                    Check the browser console (F12) for any errors, such as CORS
                    issues. If you encounter CORS errors, contact your server
                    administrator to allow cross-origin requests from your
                    domain.
                  </li>
                  <li>
                    Verify that no other elements on your page have a higher{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      z-index
                    </code>{' '}
                    that might be covering the chatbot. The chatbot uses a{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      z-index
                    </code>{' '}
                    of 9999.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Important Notes
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>
                    The chatbot is designed to work seamlessly with most
                    websites. However, if your website has strict CSP (Content
                    Security Policy) settings, you may need to allow scripts
                    from{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      {siteURL}
                    </code>
                    .
                  </li>
                  <li>
                    The chatbot uses an iframe to ensure it does not interfere
                    with your website is styles or scripts.
                  </li>
                  <li>
                    For production use, ensure{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      NEXT_PUBLIC_SITE_URL
                    </code>{' '}
                    in your environment variables is set to your production
                    domain (e.g.,{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
                      https://yourdomain.com
                    </code>
                    ).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview Chatbot */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Preview Chatbot
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600">
                Below is a live preview of the chatbot. Click the chat icon in
                the bottom-right corner to interact with it.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
