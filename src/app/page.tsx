import React from "react";
import fs from "fs/promises";
import path from "path";
import tabsData from "../../content/index.json";
import { Sidebar } from "@/components/Sidebar";
import { MarkdownViewer } from "@/components/MarkdownViewer";

export default async function Page(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const tabId = searchParams.tab || tabsData[0].subtabs[0].id;
  
  let tab = null;
  for (const group of tabsData) {
    const found = group.subtabs.find(t => t.id === tabId);
    if (found) { tab = found; break; }
  }
  if (!tab) tab = tabsData[0].subtabs[0];
  
  const filePath = path.join(process.cwd(), "content", tab.filename);
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 w-full">
      <React.Suspense fallback={<div className="w-80 bg-zinc-950 border-r border-zinc-800/50 p-6">Loading sidebar...</div>}>
        <Sidebar tabs={tabsData} activeTabId={tabId} />
      </React.Suspense>
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
        {/* Fancy background gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-20 pt-16 lg:pt-20 scrollbar-thin">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MarkdownViewer content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
