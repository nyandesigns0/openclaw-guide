"use client";

import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { FileTreeBlock, isFileTree } from "./file-tree-block";
import { remarkAccordion } from "./remark-accordion";

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

const markdownComponents: Components = {
  em({ children }) {
    return <em className="text-amber-400">{children}</em>;
  },
  strong({ children }) {
    return <strong className="text-sky-400">{children}</strong>;
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

    return <CodeBlock language={block.language}>{block.code}</CodeBlock>;
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-semibold prose-a:text-indigo-400 prose-pre:border-none prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1 hover:prose-a:text-indigo-300">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkAccordion]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
