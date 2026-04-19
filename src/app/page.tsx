import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { getTabDocument } from "@/lib/content";
import { MarkdownRenderer } from "@/lib/markdown";

export default async function Page(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const { content, tab, tabs } = await getTabDocument(searchParams.tab);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 w-full">
      <React.Suspense fallback={<div className="w-80 bg-zinc-950 border-r border-zinc-800/50 p-6">Loading sidebar...</div>}>
        <Sidebar tabs={tabs} activeTabId={tab.id} />
      </React.Suspense>
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
        {/* Fancy background gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-20 pt-16 lg:pt-20 scrollbar-thin">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
