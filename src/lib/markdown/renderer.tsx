"use client";

import {
  Children,
  isValidElement,
  useState,
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { FileTreeBlock, isFileTree } from "./file-tree-block";
import { MermaidBlock, isMermaid } from "./mermaid-block";
import { remarkAccordion } from "./remark-accordion";

const ListDepthContext = createContext(0);

type InlineCodeProps = ComponentPropsWithoutRef<"code"> & {
  node?: unknown;
};

type MarkdownCodeElementProps = ComponentPropsWithoutRef<"code"> & {
  children?: ReactNode;
};

function getLanguage(className?: string) {
  const match = /language-([\w-]+)/.exec(className || "");
  return match?.[1];
}

function extractCodeBlock(children: ReactNode) {
  const [firstChild] = Children.toArray(children);

  if (!isValidElement(firstChild)) {
    return null;
  }

  const codeElement = firstChild as ReactElement<MarkdownCodeElementProps>;
  const code = String(codeElement.props.children ?? "").replace(/\n$/, "");

  return {
    language: getLanguage(codeElement.props.className),
    code,
  };
}

type CollapsibleListItemProps = ComponentPropsWithoutRef<"li"> & {
  mainContent: ReactNode[];
  nestedList: ReactNode[];
};

function getSubtaskCount(nestedList: ReactNode[]) {
  let count = 0;
  Children.forEach(nestedList, (listNode) => {
    if (isValidElement<{ children?: ReactNode }>(listNode) && listNode.props.children) {
      Children.forEach(listNode.props.children, (item) => {
        if (isValidElement(item)) {
          count++;
        }
      });
    }
  });
  return count;
}

const depthColors: Record<number, { text: string; bg: string; border: string }> = {
  1: { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  2: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  3: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  4: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
};

function UlComponent({ children, className, ...props }: ComponentPropsWithoutRef<"ul">) {
  const depth = useContext(ListDepthContext);
  return (
    <ListDepthContext.Provider value={depth + 1}>
      <ul className={className} {...props}>{children}</ul>
    </ListDepthContext.Provider>
  );
}

function OlComponent({ children, className, ...props }: ComponentPropsWithoutRef<"ol">) {
  const depth = useContext(ListDepthContext);
  return (
    <ListDepthContext.Provider value={depth + 1}>
      <ol className={className} {...props}>{children}</ol>
    </ListDepthContext.Provider>
  );
}

function CollapsibleListItem({ mainContent, nestedList, className, ...props }: CollapsibleListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const subtaskCount = getSubtaskCount(nestedList);
  
  const depth = useContext(ListDepthContext);
  const colors = depthColors[Math.min(depth, 4)] || depthColors[1];

  return (
    <li className={cn("my-1 relative group/list", className)} {...props}>
      <div 
        className="flex items-start sm:items-center justify-between cursor-pointer select-none transition-colors hover:text-indigo-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 [&>p]:m-0">
          {mainContent}
        </div>
        <div className="flex items-center gap-2 ml-4 opacity-70 group-hover/list:opacity-100 transition-opacity">
          <span className={cn(
            "text-[11px] font-medium px-2 py-0.5 rounded border uppercase tracking-wider",
            colors.text,
            colors.bg,
            colors.border
          )}>
            {subtaskCount} task{subtaskCount !== 1 && 's'}
          </span>
          <button 
            className="p-0.5 rounded transition-colors hover:bg-zinc-700 hover:text-zinc-200 shrink-0 text-zinc-500"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-1">
          {nestedList}
        </div>
      )}
    </li>
  );
}

const markdownComponents: Components = {
  em({ children }) {
    return <em className="text-amber-400">{children}</em>;
  },
  strong({ children }) {
    return <strong className="text-sky-400">{children}</strong>;
  },
  ul: UlComponent,
  ol: OlComponent,
  li({ children, className, ...props }) {
    const childrenArray = Children.toArray(children);
    const nestedListIndex = childrenArray.findIndex(
      (child) => isValidElement(child) && (child.type === 'ul' || child.type === 'ol' || child.type === UlComponent || child.type === OlComponent)
    );

    if (nestedListIndex > -1) {
      const mainContent = childrenArray.slice(0, nestedListIndex);
      const nestedList = childrenArray.slice(nestedListIndex);
      return (
        <CollapsibleListItem 
          className={className} 
          mainContent={mainContent} 
          nestedList={nestedList} 
          {...props} 
        />
      );
    }

    return <li className={className} {...props}>{children}</li>;
  },
  code({ node: _node, className, children, ...props }: InlineCodeProps) {
    return (
      <code
        className={cn(
          "rounded border border-zinc-700/30 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-300",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre({ children }) {
    const block = extractCodeBlock(children);

    if (!block) {
      return <pre>{children}</pre>;
    }

    if (isFileTree(block.code, block.language)) {
      return <FileTreeBlock content={block.code} />;
    }

    if (isMermaid(block.code, block.language)) {
      return <MermaidBlock content={block.code} />;
    }

    return <CodeBlock language={block.language}>{block.code}</CodeBlock>;
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-semibold prose-a:text-indigo-400 prose-pre:border-none prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1 hover:prose-a:text-indigo-300">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm, remarkAccordion]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
