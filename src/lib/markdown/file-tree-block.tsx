"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  FileJson, 
  File, 
  FileImage, 
  LayoutTemplate, 
  Settings,
  Copy,
  Check,
  FolderMinus,
  FolderPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { copyText } from "./copy";

interface FileTreeBlockProps {
  content: string;
}

type FileNode = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
  depth: number;
};

export function isFileTree(code: string, language?: string) {
  if (language !== 'text' && language !== 'plaintext' && language !== '') return false;
  
  const lines = code.trim().split('\n');
  if (lines.length < 2) return false;
  
  const hasFolder = lines.some(line => line.trim().endsWith('/'));
  const hasIndentation = lines.some(line => /^\s+/.test(line));
  
  let validPathCount = 0;
  let nonEmptyCount = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    nonEmptyCount++;
    
    // A path usually doesn't have spaces in the middle, unless it's part of a valid file name
    // and usually doesn't have sentences.
    if (!trimmed.includes(' ') || trimmed.endsWith('/')) {
      validPathCount++;
    }
  }
  
  // At least 80% of non-empty lines must look like paths
  const looksLikeTree = nonEmptyCount > 0 && (validPathCount / nonEmptyCount) > 0.8;
  
  return hasFolder && hasIndentation && looksLikeTree;
}

function parseFileTree(text: string): FileNode[] {
  const lines = text.split("\n").filter(line => line.trim().length > 0);
  const root: FileNode = { id: "root", name: "root", type: "folder", children: [], depth: -1 };
  const stack = [{ depth: -1, node: root }];

  lines.forEach((line, index) => {
    const match = line.match(/^(\s*)(.*)$/);
    if (!match) return;
    const indentation = match[1].length;
    const rawName = match[2].trim();
    
    if (!rawName) return;

    const isFolder = rawName.endsWith("/");
    const name = isFolder ? rawName.slice(0, -1) : rawName;
    
    const node: FileNode = {
      id: `${index}-${name}`,
      name,
      type: isFolder ? "folder" : "file",
      children: isFolder ? [] : undefined,
      depth: indentation
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= indentation) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].node;
    if (parent.children) {
      parent.children.push(node);
    }
    
    if (isFolder) {
      stack.push({ depth: indentation, node });
    }
  });

  return root.children || [];
}

function getIcon(name: string, type: "folder" | "file", isOpen: boolean) {
  if (type === "folder") {
    return isOpen ? <FolderOpen size={16} className="text-blue-400" /> : <Folder size={16} className="text-blue-400" />;
  }
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'json': return <FileJson size={16} className="text-yellow-400" />;
    case 'md': 
    case 'mdx': return <FileText size={16} className="text-indigo-400" />;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx': return <FileCode size={16} className="text-blue-400" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg': return <FileImage size={16} className="text-purple-400" />;
    case 'html': return <LayoutTemplate size={16} className="text-orange-400" />;
    case 'env':
    case 'config': return <Settings size={16} className="text-zinc-400" />;
    default: return <File size={16} className="text-zinc-400" />;
  }
}

function FileTreeNode({ 
  node, 
  expandedNodes, 
  toggleNode 
}: { 
  node: FileNode; 
  expandedNodes: Set<string>; 
  toggleNode: (id: string) => void 
}) {
  const isOpen = expandedNodes.has(node.id);
  // Calculate padding based on relative depth, using the first node's depth as base if needed.
  // But absolute space count works well too (e.g., depth 0 = 0px, depth 2 = 16px, depth 4 = 32px).
  // Each space is approximately 8px. Let's make the multiplier 8.
  const paddingLeft = Math.max(0, node.depth * 8) + 8;
  
  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-1.5 py-1.5 pr-3 rounded-md cursor-pointer select-none transition-colors hover:bg-zinc-800/60",
          "text-sm group"
        )}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => node.type === "folder" && toggleNode(node.id)}
      >
        <span className="w-4 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
          {node.type === "folder" ? (
            isOpen ? <ChevronDown size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />
          ) : null}
        </span>
        <div className="opacity-90 group-hover:opacity-100 transition-opacity">
          {getIcon(node.name, node.type, isOpen)}
        </div>
        <span className={cn(
          "ml-1 font-medium tracking-wide transition-colors",
          node.type === "folder" ? "text-zinc-200 group-hover:text-white" : "text-zinc-400 group-hover:text-zinc-300"
        )}>
          {node.name}
        </span>
      </div>
      
      {node.type === "folder" && isOpen && node.children && (
        <div className="flex flex-col">
          {node.children.map(child => (
            <FileTreeNode 
              key={child.id} 
              node={child} 
              expandedNodes={expandedNodes} 
              toggleNode={toggleNode} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTreeBlock({ content }: FileTreeBlockProps) {
  const nodes = useMemo(() => parseFileTree(content), [content]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    // Copy the raw markdown content
    const didCopy = await copyText(content, null);
    if (!didCopy) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  
  // Memoize all folder IDs so we can easily expand all
  const allFolderIds = useMemo(() => {
    const ids = new Set<string>();
    const traverse = (n: FileNode[]) => {
      for (const node of n) {
        if (node.type === "folder") {
          ids.add(node.id);
          if (node.children) traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return ids;
  }, [nodes]);

  // By default, folders are collapsed
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllFolders = () => {
    if (expandedNodes.size > 0) {
      setExpandedNodes(new Set());
    } else {
      setExpandedNodes(new Set(allFolderIds));
    }
  };

  const isAnyFolderOpen = expandedNodes.size > 0;

  return (
    <div className="not-prose isolate relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0f] shadow-2xl ring-1 ring-white/5">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-2 backdrop-blur-md">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] select-none">
          Explorer
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleAllFolders}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title={isAnyFolderOpen ? "Collapse All Folders" : "Expand All Folders"}
          >
            {isAnyFolderOpen ? <FolderMinus size={14} /> : <FolderPlus size={14} />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title="Copy Tree"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title={isExpanded ? "Collapse Block" : "Expand Block"}
          >
            <ChevronRight size={14} className={cn("transition-transform duration-200", isExpanded ? "rotate-90" : "")} />
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent transition-all duration-300",
          isExpanded ? "p-3 max-h-[500px]" : "h-0 max-h-0"
        )}
      >
        {nodes.map(node => (
          <FileTreeNode 
            key={node.id} 
            node={node} 
            expandedNodes={expandedNodes} 
            toggleNode={toggleNode} 
          />
        ))}
      </div>
    </div>
  );
}
