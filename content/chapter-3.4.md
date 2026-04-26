# Chapter 3.4 — Frontend

## 3.4.0 Overview

The A.A.A. frontend is a Next.js operator console organized into a left-sidebar shell with workspace panels, featuring UI elements across four categories: General, Chat, Build, and Explore.

### 3.4.1 General UI Elements

**Application Shell:** The layout follows a left-sidebar plus main-workspace pattern, styled as a dark-themed control plane console rather than a marketing-style top-nav app. \
**Left Sidebar — Logo and Mode Switcher:** The top displays the A.A.A. logo and a mode switch toggling between Build, Chat, and Explore. \
**Left Sidebar — Session Folders:** Below the switcher, folders organized by sessions. Each session represents a pipeline run, grouping conversations, artifacts, and execution history. \
**Left Sidebar — Pipeline List:** Shows saved pipelines (Build mode) or recent chat sessions (Chat mode), fetched via the bootstrap endpoint. \
**Active Workspace Context:** Displays the currently selected pipeline or session name, status, and project. \
**Responsive Layout:** Panel widths and sidebar visibility adapt for standard and ultrawide displays.

### 3.4.2 Chat Mode UI Elements

**Main Chat Area:** A group-chat interface displaying messages from the user and each pipeline agent in chronological order, with agent name and role attribution. \
**Message Input Bar:** A text input at the bottom for composing messages. Submitting triggers the linked pipeline to execute via the backend API. \
**Agent Attribution Labels:** Each agent message shows the agent name, role, and originating pipeline node. \
**Approval Controls:** When an approval node is reached, inline approve and reject buttons appear with a text field for operator notes. \
**Right Sidebar — Vertical Tab Rail:** Vertically stacked tabs (labels rotated 90 degrees, Adobe/AutoCAD style) switching between four contextual panels. \
**Right Sidebar — General Tab:** Session metadata, editable title, list of participating agents with roles, and toggle controls to mute agents from the chat view without affecting execution. \
**Right Sidebar — Project File Browser Tab:** A Revit-style project browser showing all project files in a navigable tree. Two views available: a simplified icon grid (Android-style) and an explicit folder-structure tree. \
**Right Sidebar — File Viewer/Editor Tab:** Opens selected files (`.md`, `.json`, images) inline within the sidebar without leaving the chat view. \
**Right Sidebar — Terminal Tab:** A filtered execution log of backend activity for the current pipeline run, showing only agent-related tasks in a user-readable format. \
**Run Status Indicators:** Visual indicators showing current run status (queued, running, waiting, completed, failed, cancelled) and the currently executing step.

### 3.4.3 Build Mode UI Elements

**Infinite Canvas:** An infinite-scroll canvas serving as the pipeline graph editor with full pan and zoom support. \
**Node Cards:** Each pipeline node rendered as a visual card positioned by saved x/y coordinates, displaying the node label, type icon (agent, tool, or approval), and agent role. \
**Edge Connections:** Directed edges rendered as SVG curves representing execution flow and data handoff between stages. \
**Node Selection and Editing Panel:** Clicking a node opens a side panel with editable fields: label, stable key, node type, agent role, task prompt, system prompt, persistent context, context mode, and canvas position. \
**Add Node Control:** Adds new agent, tool, or approval nodes to the canvas at a default position. \
**Edge Creation Control:** Defines new directed edges between existing nodes, establishing execution order. \
**Pipeline Metadata Bar:** Displays and allows inline editing of the pipeline name, description, and status. \
**Save Pipeline Button:** Persists the full graph state (nodes, edges, metadata) atomically to the backend via `PUT /api/pipelines/:pipelineId`. \
**Open Chat Session Button:** Creates a new chat session bound to the current pipeline and switches to Chat mode.

### 3.4.4 Explore Mode UI Elements

**3D Viewer:** A WebGL-based 3D viewer with orbit, pan, and zoom controls for inspecting computed architectural geometry. \
**Geometry Render Surface:** Displays meshes, surfaces, and curves received from the Rhino Compute backend with shading and wireframe modes. \
**Right Sidebar — Layer Panel:** Lists all geometry layers with visibility toggles, enabling isolation of specific building elements (structure, envelope, interior, site). \
**Right Sidebar — Tools Panel:** Client-side measurement and annotation tools for distances, areas, and markup. \
**Compute Command Controls:** Controls for sending high-level editing commands to Rhino Compute — regenerating models with modified parameters, cutting section planes, or extracting plan views. \
**Session Sidebar (Left):** Retains the same session list and mode switcher as other modes for cross-mode navigation.
