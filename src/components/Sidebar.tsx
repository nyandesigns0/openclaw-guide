"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Menu, X, Info, Lightbulb, Layers, Settings, Globe, Shield, History, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const iconMap: Record<string, any> = {
  Info,
  Lightbulb,
  Layers,
  Settings,
  Globe,
  Shield,
  History
};

export function Sidebar({ tabs, activeTabId }: { tabs: any[], activeTabId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find which group contains the active tab to expand it initially
  const initialExpandedGroupId = tabs.find(g => g.subtabs.some((s: any) => s.id === activeTabId))?.id;
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    [initialExpandedGroupId]: true
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-800/50 transform transition-transform duration-300 ease-in-out flex flex-col shrink-0 h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-zinc-800/50 shrink-0">
          <h1 className="text-2xl font-semibold bg-gradient-to-br from-indigo-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
            OpenClaw Setup
          </h1>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Windows Guide</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-3 scrollbar-thin">
          {tabs.map((group) => {
            const isExpanded = expandedGroups[group.id];
            const hasActiveSubtab = group.subtabs.some((s: any) => s.id === activeTabId);
            const Icon = iconMap[group.icon] || FileText;

            return (
              <div key={group.id} className="space-y-1 relative z-10">
                <Link
                  href={`/?tab=${group.subtabs[0].id}`}
                  onClick={(e) => {
                    // Only prevent default if we just want to toggle, 
                    // but here we want both expansion and navigation.
                    // We toggle expansion separately.
                    toggleGroup(group.id);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                    hasActiveSubtab && !isExpanded ? "text-white" : "text-zinc-300 hover:text-white"
                  )}
                >
                  <Icon size={18} className={cn("transition-colors", hasActiveSubtab ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-400")} />
                  <span className="truncate">{group.title}</span>
                  {isExpanded ? (
                    <ChevronDown size={16} className="ml-auto text-zinc-500" />
                  ) : (
                    <ChevronRight size={16} className="ml-auto text-zinc-600" />
                  )}
                </Link>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden relative z-0"
                    >
                      <div className="pl-9 pr-2 py-1 space-y-1">
                        {group.subtabs.map((subtab: any) => {
                          const isActive = subtab.id === activeTabId;
                          return (
                            <Link 
                              key={subtab.id} 
                              href={`/?tab=${subtab.id}`}
                              className={cn(
                                "relative block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer z-10 pointer-events-auto",
                                isActive ? "text-indigo-300 font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeSubtab"
                                  className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-md -z-10"
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                              <span className="truncate block relative z-10">{subtab.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800/50 shrink-0">
           <div className="text-xs text-zinc-600 text-center">
             Nyan Designs
           </div>
        </div>
      </aside>
    </>
  );
}
