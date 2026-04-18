import ReactMarkdown from "react-markdown";

export function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-semibold prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-li:my-1">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
}
