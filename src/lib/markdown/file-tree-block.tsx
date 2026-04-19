"use client";

import { useState, useMemo } from "react";
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
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  
  // By default expand all folders so the user can see the entire structure
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const allFolderIds = new Set<string>();
    const traverse = (n: FileNode[]) => {
      for (const node of n) {
        if (node.type === "folder") {
          allFolderIds.add(node.id);
          if (node.children) traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return allFolderIds;
  });

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

  return (
    <div className="not-prose isolate relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0f] shadow-2xl ring-1 ring-white/5">
      {/* Mac-like Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 w-20">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">
          Explorer
        </span>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>
      
      {/* File Tree Content */}
      <div className="p-3 overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
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
