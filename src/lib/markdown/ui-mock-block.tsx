"use client";

import { useState } from "react";
import { Check, Copy, Pin, X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { copyText } from "./copy";

/**
 * UI Mockup block — renders a ```ui code fence as a wireframe mockup.
 *
 * Line grammar (indentation = nesting, 2+ spaces per level):
 *   keyword "Label" flag1 flag2 key=value key="quoted value"
 *
 * Keywords: screen, row, col, panel, bar, grid, tile, chip, thumb,
 *           badge, meter, button, input, text, banner, divider, spacer, dot
 */

type UiNode = {
  keyword: string;
  label?: string;
  flags: Set<string>;
  attrs: Record<string, string>;
  children: UiNode[];
  depth: number;
};

export function isUiMock(code: string, language?: string) {
  return language === "ui" || language === "uimock";
}

const KNOWN_KEYWORDS = new Set([
  "screen", "row", "col", "panel", "bar", "grid", "tile", "chip", "thumb",
  "badge", "meter", "button", "input", "text", "banner", "divider", "spacer", "dot",
]);

function parseLine(raw: string): { depth: number; node: UiNode } | null {
  const match = raw.match(/^(\s*)(\S.*)$/);
  if (!match) return null;
  const depth = match[1].length;
  const body = match[2].trim();
  if (body.startsWith("#")) return null;

  const tokenRegex = /([\w-]+)=("([^"]*)"|\S+)|"([^"]*)"|(\S+)/g;
  let keyword = "";
  let label: string | undefined;
  const flags = new Set<string>();
  const attrs: Record<string, string> = {};

  let tokenMatch: RegExpExecArray | null;
  while ((tokenMatch = tokenRegex.exec(body)) !== null) {
    if (tokenMatch[1] !== undefined) {
      attrs[tokenMatch[1]] = tokenMatch[3] !== undefined ? tokenMatch[3] : tokenMatch[2];
    } else if (tokenMatch[4] !== undefined) {
      if (label === undefined) label = tokenMatch[4];
    } else if (tokenMatch[5] !== undefined) {
      if (!keyword) keyword = tokenMatch[5].toLowerCase();
      else flags.add(tokenMatch[5].toLowerCase());
    }
  }

  if (!keyword || !KNOWN_KEYWORDS.has(keyword)) {
    // Unknown leading word: treat whole line as plain text content.
    return { depth, node: { keyword: "text", label: body, flags: new Set(), attrs: {}, children: [], depth } };
  }

  return { depth, node: { keyword, label, flags, attrs, children: [], depth } };
}

function parseUiMock(code: string): UiNode[] {
  const roots: UiNode[] = [];
  const stack: UiNode[] = [];

  for (const raw of code.split(/\r?\n/)) {
    if (!raw.trim()) continue;
    const parsed = parseLine(raw);
    if (!parsed) continue;
    const { depth, node } = parsed;

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }

  return roots;
}

/* ---------- rendering ---------- */

const chipStateStyles: Record<string, string> = {
  open: "border-zinc-700 text-zinc-500 border-dashed",
  narrowing: "border-amber-500/60 text-amber-400 animate-pulse",
  locked: "border-emerald-500/60 bg-emerald-500/10 text-emerald-400",
};

const badgeStyles: Record<string, string> = {
  phase: "border-indigo-500/50 bg-indigo-500/10 text-indigo-300",
  degraded: "border-red-500/50 bg-red-500/10 text-red-400",
  ok: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  warn: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  default: "border-zinc-700 bg-zinc-800/60 text-zinc-400",
};

function ImagePlaceholder({ dimmed }: { dimmed?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={cn("h-full w-full", dimmed ? "opacity-30" : "opacity-60")}
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect x="1" y="1" width="98" height="58" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="1" x2="99" y2="59" stroke="currentColor" strokeWidth="0.75" />
      <line x1="99" y1="1" x2="1" y2="59" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function renderChildren(nodes: UiNode[]) {
  return nodes.map((child, index) => <UiElement key={index} node={child} />);
}

function UiElement({ node }: { node: UiNode }) {
  const { keyword, label, flags, attrs, children } = node;

  switch (keyword) {
    case "screen":
      return (
        <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 rounded-full bg-zinc-700" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">{label}</span>
          </div>
          <div className="flex flex-col gap-2 p-2">{renderChildren(children)}</div>
        </div>
      );

    case "row":
      return (
        <div className={cn("flex min-w-0 items-stretch gap-2", flags.has("center") && "items-center", flags.has("grow") && "flex-1")}>
          {renderChildren(children)}
        </div>
      );

    case "col":
      return (
        <div className={cn("flex min-w-0 flex-col gap-2", flags.has("grow") && "flex-1")}>
          {renderChildren(children)}
        </div>
      );

    case "panel":
      return (
        <div
          className={cn(
            "flex min-w-0 flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-900/40 p-2",
            flags.has("grow") && "flex-1",
            flags.has("dim") && "opacity-60"
          )}
          style={attrs.w ? { width: attrs.w } : undefined}
        >
          {label ? (
            <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</div>
          ) : null}
          {renderChildren(children)}
        </div>
      );

    case "bar":
      return (
        <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/70 px-2 py-1.5">
          {label ? <span className="text-[11px] font-medium text-zinc-400">{label}</span> : null}
          {renderChildren(children)}
        </div>
      );

    case "grid": {
      const cols = Number(attrs.cols || "3");
      return (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {renderChildren(children)}
        </div>
      );
    }

    case "tile": {
      const selected = flags.has("selected");
      const pinned = flags.has("pinned");
      const rejected = flags.has("rejected");
      return (
        <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded border text-zinc-600",
            selected ? "border-sky-400 ring-1 ring-sky-400/50" : "border-zinc-800",
            pinned && "border-amber-400 ring-1 ring-amber-400/50",
            rejected && "opacity-40"
          )}
        >
          <div className="relative h-16 bg-zinc-900">
            <ImagePlaceholder dimmed={rejected} />
            {pinned ? <Pin size={12} className="absolute right-1 top-1 text-amber-400" /> : null}
            {rejected ? <X size={12} className="absolute right-1 top-1 text-red-400" /> : null}
            {selected ? <Check size={12} className="absolute right-1 top-1 text-sky-400" /> : null}
            {flags.has("degraded") ? (
              <span className="absolute left-1 top-1 rounded border border-red-500/50 bg-red-950/80 px-1 text-[8px] font-bold uppercase tracking-wider text-red-400">
                degraded
              </span>
            ) : null}
          </div>
          {label ? (
            <div className="border-t border-zinc-800 bg-zinc-900/80 px-1.5 py-1 text-[9px] leading-tight text-zinc-400">
              {label}
            </div>
          ) : null}
          {children.length > 0 ? <div className="flex gap-1 p-1">{renderChildren(children)}</div> : null}
        </div>
      );
    }

    case "chip": {
      const state = attrs.state || "open";
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 self-start rounded-full border px-2 py-0.5 text-[10px] font-medium",
            chipStateStyles[state] || chipStateStyles.open
          )}
        >
          {label}
          {attrs.value ? <span className="font-semibold">· {attrs.value}</span> : null}
        </span>
      );
    }

    case "thumb":
      return (
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-[9px] text-zinc-500">
          <ImagePlaceholder />
          <span className="absolute inset-0 flex items-center justify-center font-semibold text-zinc-400">{label}</span>
          {flags.has("x") ? (
            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800">
              <X size={7} className="text-zinc-400" />
            </span>
          ) : null}
        </span>
      );

    case "badge": {
      const variant = flags.has("phase")
        ? "phase"
        : flags.has("degraded")
          ? "degraded"
          : flags.has("ok")
            ? "ok"
            : flags.has("warn")
              ? "warn"
              : "default";
      return (
        <span className={cn("inline-flex self-start rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest", badgeStyles[variant])}>
          {label}
        </span>
      );
    }

    case "meter": {
      const value = Math.max(0, Math.min(100, Number(attrs.value || "0")));
      const frozen = flags.has("frozen");
      return (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {label ? <span className="text-[9px] uppercase tracking-wider text-zinc-500">{label}</span> : null}
          <div className="h-1.5 min-w-12 flex-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={cn("h-full rounded-full", frozen ? "bg-red-500/50" : "bg-indigo-500")}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className={cn("text-[9px] font-mono", frozen ? "text-red-400" : "text-zinc-500")}>
            {value}%{frozen ? " ❄" : ""}
          </span>
        </div>
      );
    }

    case "button":
      return (
        <span
          className={cn(
            "inline-flex items-center self-start rounded border px-2 py-0.5 text-[10px] font-medium",
            flags.has("primary")
              ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300"
              : flags.has("danger")
                ? "border-red-500/50 bg-red-500/10 text-red-400"
                : "border-zinc-700 bg-zinc-800/60 text-zinc-300"
          )}
        >
          {label}
        </span>
      );

    case "input":
      return (
        <div className="flex flex-1 items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <span className="truncate text-[11px] italic text-zinc-600">{label || "Type a message…"}</span>
          <span className="ml-auto flex shrink-0 gap-1">{renderChildren(children)}</span>
        </div>
      );

    case "banner":
      return (
        <div
          className={cn(
            "flex flex-col gap-1 rounded border px-2 py-1.5 text-[11px]",
            flags.has("warn")
              ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
              : "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
          )}
        >
          {label}
          {children.length > 0 ? <div className="flex gap-2">{renderChildren(children)}</div> : null}
        </div>
      );

    case "divider":
      return <div className="my-1 border-t border-zinc-800" />;

    case "spacer":
      return <span className="flex-1" />;

    case "dot":
      return (
        <Circle
          size={8}
          className={cn(
            "shrink-0",
            flags.has("online") ? "fill-emerald-400 text-emerald-400" : "fill-zinc-600 text-zinc-600"
          )}
        />
      );

    case "text":
    default:
      return (
        <span
          className={cn(
            "text-[11px] leading-snug text-zinc-300",
            flags.has("dim") && "text-zinc-500",
            flags.has("mono") && "font-mono text-[10px]"
          )}
        >
          {label}
        </span>
      );
  }
}

export function UiMockBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const nodes = parseUiMock(content);

  const handleCopy = async () => {
    const didCopy = await copyText(content, null);
    if (!didCopy) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose isolate relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-700/50">
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">ui mockup</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          title="Copy mockup source"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="flex flex-col gap-3 p-4">{nodes.map((node, index) => <UiElement key={index} node={node} />)}</div>
    </div>
  );
}
