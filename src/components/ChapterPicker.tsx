"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ContentGroup, ContentTab } from "@/lib/content";

function flattenChapters(tabs: ContentGroup[]): ContentTab[] {
  return tabs.flatMap((group) => group.subtabs);
}

function formatChapterLabel(tabId: string) {
  return tabId.replace(/^chapter-/, "");
}

function resolveChapterInput(input: string, chapters: ContentTab[]): ContentTab | null {
  const normalized = input.trim();
  if (!normalized) {
    return null;
  }

  const chapterId = normalized.startsWith("chapter-") ? normalized : `chapter-${normalized}`;
  const byId = chapters.find((chapter) => chapter.id === chapterId);
  if (byId) {
    return byId;
  }

  const byTitlePrefix = chapters.find(
    (chapter) =>
      chapter.title.startsWith(`${normalized} `) ||
      chapter.title.startsWith(`${normalized}.`) ||
      chapter.title === normalized
  );
  if (byTitlePrefix) {
    return byTitlePrefix;
  }

  return null;
}

export function ChapterPicker({
  tabs,
  activeTabId,
}: {
  tabs: ContentGroup[];
  activeTabId: string;
}) {
  const router = useRouter();
  const chapters = useMemo(() => flattenChapters(tabs), [tabs]);
  const currentIndex = chapters.findIndex((chapter) => chapter.id === activeTabId);
  const [draft, setDraft] = useState(() => formatChapterLabel(activeTabId));

  useEffect(() => {
    setDraft(formatChapterLabel(activeTabId));
  }, [activeTabId]);

  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  function navigateTo(tabId: string) {
    router.push(`/?tab=${tabId}`);
  }

  function commitDraft() {
    const match = resolveChapterInput(draft, chapters);
    if (match) {
      if (match.id !== activeTabId) {
        navigateTo(match.id);
      }
      setDraft(formatChapterLabel(match.id));
      return;
    }

    setDraft(formatChapterLabel(activeTabId));
  }

  return (
    <div
      className="fixed left-1/2 top-4 z-[60] flex -translate-x-1/2 items-center lg:hidden"
      aria-label="Chapter navigation"
    >
      <button
        type="button"
        aria-label="Previous chapter"
        disabled={!previousChapter}
        onClick={() => previousChapter && navigateTo(previousChapter.id)}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-l-md border border-zinc-700 bg-zinc-900/95 text-zinc-300 transition-colors",
          previousChapter ? "hover:bg-zinc-800 hover:text-white" : "cursor-not-allowed opacity-40"
        )}
      >
        <ChevronLeft size={18} />
      </button>
      <label className="sr-only" htmlFor="chapter-picker-input">
        Chapter number
      </label>
      <input
        id="chapter-picker-input"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commitDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        className="h-9 w-[4.5rem] border-y border-zinc-700 bg-zinc-900/95 px-2 text-center font-mono text-sm text-zinc-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
        aria-label="Chapter number"
      />
      <button
        type="button"
        aria-label="Next chapter"
        disabled={!nextChapter}
        onClick={() => nextChapter && navigateTo(nextChapter.id)}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-r-md border border-zinc-700 bg-zinc-900/95 text-zinc-300 transition-colors",
          nextChapter ? "hover:bg-zinc-800 hover:text-white" : "cursor-not-allowed opacity-40"
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
