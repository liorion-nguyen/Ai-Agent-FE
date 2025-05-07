import 'github-markdown-css';
import 'highlight.js/styles/github.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <div
      className="markdown-body"
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: 'fit-content',
      }}
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
