import fs from "fs/promises";
import path from "path";
import tabsJson from "../../content/index.json";

export interface ContentTab {
  id: string;
  title: string;
  filename: string;
  updatedAt: string;
}

export interface ContentGroup {
  id: string;
  title: string;
  icon: string;
  subtabs: ContentTab[];
}

const tabs = tabsJson as ContentGroup[];

function getFallbackTab(): ContentTab {
  const fallbackTab = tabs[0]?.subtabs[0];

  if (!fallbackTab) {
    throw new Error("No markdown tabs are configured in content/index.json");
  }

  return fallbackTab;
}

export function getTabs(): ContentGroup[] {
  return tabs;
}

export function getTabById(tabId?: string): ContentTab {
  if (!tabId) {
    return getFallbackTab();
  }

  for (const group of tabs) {
    const match = group.subtabs.find((tab) => tab.id === tabId);
    if (match) {
      return match;
    }
  }

  return getFallbackTab();
}

export async function getTabDocument(tabId?: string) {
  const tab = getTabById(tabId);
  const filePath = path.join(process.cwd(), "content", tab.filename);
  const content = await fs.readFile(filePath, "utf-8");

  return {
    tab,
    tabs,
    content,
  };
}
