"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { copyText } from "./copy";

interface CodeBlockProps {
  children: string;
  language?: string;
}

const COLLAPSED_LINE_COUNT = 3;
const COPY_RESET_DELAY_MS = 2000;

export function CodeBlock({ children, language }: CodeBlockProps) {
  const code = children.trim();
  const lineCount = code === "" ? 0 : code.split("\n").length;
  const isExpandable = lineCount >= COLLAPSED_LINE_COUNT;
  const [isExpanded, setIsExpanded] = useState(!isExpandable);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    const didCopy = await copyText(code, codeRef.current);

    if (!didCopy) {
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), COPY_RESET_DELAY_MS);
  };

  return (
    <div className="not-prose isolate relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-700/50">
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {language || "code"}
          </span>
          <span className="font-mono text-[10px] text-zinc-600">
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title="Copy code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          {isExpandable ? (
            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          ) : null}
        </div>
      </div>

      <div className={`relative transition-all duration-300 ${isExpanded ? "" : "max-h-[120px] overflow-hidden"}`}>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code ref={codeRef} className={language ? `language-${language}` : undefined}>
            {code}
          </code>
        </pre>

        {!isExpanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
        ) : null}
      </div>

      {!isExpanded && isExpandable ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="relative z-10 flex w-full items-center justify-center gap-2 border-t border-zinc-800 bg-zinc-900/80 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          Show full code <ChevronDown size={12} />
        </button>
      ) : null}
    </div>
  );
}
