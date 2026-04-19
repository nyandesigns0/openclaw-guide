import fs from "fs/promises";
import path from "path";
import tabsJson from "../../content/index.json";

export interface ContentTab {
  id: string;
  title: string;
  filename: string;
  updatedAt?: string;
}

export interface ContentGroup {
  id: string;
  title: string;
  icon: string;
  subtabs: ContentTab[];
}

const staticTabs = tabsJson as ContentGroup[];

export async function getTabs(): Promise<ContentGroup[]> {
  const updatedTabs = await Promise.all(
    staticTabs.map(async (group) => {
      const updatedSubtabs = await Promise.all(
        group.subtabs.map(async (tab) => {
          const filePath = path.join(process.cwd(), "content", tab.filename);
          try {
            const content = await fs.readFile(filePath, "utf-8");
            const match = content.match(/^#\s+(.*)/m);
            return {
              ...tab,
              title: match ? match[1].trim() : tab.title,
            };
          } catch (e) {
            return tab;
          }
        })
      );
      return {
        ...group,
        subtabs: updatedSubtabs,
      };
    })
  );
  return updatedTabs;
}

export async function getTabById(tabId?: string): Promise<ContentTab> {
  const tabs = await getTabs();
  
  let tab = tabs[0]?.subtabs[0];
  if (tabId) {
    for (const group of tabs) {
      const match = group.subtabs.find((t) => t.id === tabId);
      if (match) {
        tab = match;
        break;
      }
    }
  }

  if (!tab) {
    throw new Error("No markdown tabs are configured in content/index.json");
  }

  return tab;
}

export async function getTabDocument(tabId?: string) {
  const tabs = await getTabs();
  
  let tab = tabs[0]?.subtabs[0];
  if (tabId) {
    for (const group of tabs) {
      const match = group.subtabs.find((t) => t.id === tabId);
      if (match) {
        tab = match;
        break;
      }
    }
  }

  if (!tab) {
    throw new Error("No markdown tabs are configured in content/index.json");
  }

  const filePath = path.join(process.cwd(), "content", tab.filename);
  const content = await fs.readFile(filePath, "utf-8");

  return {
    tab,
    tabs,
    content,
  };
}
