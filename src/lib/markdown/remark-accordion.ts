import type { Plugin } from "unified";
import type { Root, Content } from "mdast";

function countWords(node: any): number {
  if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
    return (node.value || "").trim().split(/\s+/).filter(Boolean).length;
  }
  if (node.children) {
    return node.children.reduce((acc: number, child: any) => acc + countWords(child), 0);
  }
  return 0;
}

export const remarkAccordion: Plugin<[], Root> = () => {
  return (tree) => {
    const newChildren: Content[] = [];
    let currentDetails: any = null;

    for (const node of tree.children) {
      if (node.type === "heading" && node.depth === 3) {
        currentDetails = {
          type: "paragraph",
          data: {
            hName: "details",
            hProperties: {
              className: "group mb-1 transition-colors",
            },
          },
          children: [
            {
              type: "paragraph",
              data: {
                hName: "summary",
                hProperties: {
                  className:
                    "flex cursor-pointer items-center justify-between py-1.5 border-b border-zinc-800/50 font-semibold text-zinc-100 select-none [&::-webkit-details-marker]:hidden hover:border-zinc-700/50",
                },
              },
              children: [
                {
                  ...node,
                  data: {
                    ...node.data,
                    hProperties: {
                      className: "m-0 text-lg inline-block text-indigo-200",
                    },
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    hName: "div",
                    hProperties: {
                      className: "flex items-center gap-3 shrink-0",
                    },
                  },
                  children: [
                    {
                      type: "paragraph",
                      data: {
                        hName: "span",
                        hProperties: {
                          className: "text-xs font-medium text-zinc-600",
                        },
                      },
                      children: [{ type: "text", value: "0 words" }], // Placeholder
                    },
                    {
                      type: "paragraph",
                      data: {
                        hName: "svg",
                        hProperties: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          className:
                            "transform transition-transform duration-200 group-open:rotate-90 text-zinc-500",
                        },
                      },
                      children: [
                        {
                          type: "paragraph",
                          data: {
                            hName: "polyline",
                            hProperties: {
                              points: "9 18 15 12 9 6",
                            },
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              data: {
                hName: "div",
                hProperties: {
                  className: "pt-1 pb-2",
                },
              },
              children: [],
            },
          ],
        };
        newChildren.push(currentDetails);
      } else if (node.type === "heading" && node.depth < 3) {
        currentDetails = null;
        newChildren.push(node);
      } else {
        if (currentDetails) {
          currentDetails.children[1].children.push(node);
        } else {
          newChildren.push(node);
        }
      }
    }

    // Second pass to count words and update the placeholder
    for (const child of newChildren) {
      if (child.data?.hName === "details") {
        const contentNode = (child as any).children[1];
        const wordCount = countWords(contentNode);

        const summaryNode = (child as any).children[0];
        const flexContainer = summaryNode.children[1];
        const spanNode = flexContainer.children[0];
        spanNode.children[0].value = `${wordCount} word${wordCount === 1 ? "" : "s"}`;
      }
    }

    tree.children = newChildren;
  };
};
