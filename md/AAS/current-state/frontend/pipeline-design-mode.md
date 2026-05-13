# Pipeline Design Mode

## Purpose

Pipeline Design mode lets the operator define and edit the saved execution graph.

## Current capabilities

- select a saved pipeline
- edit pipeline name, description, and status
- add nodes
- add simple handoff edges
- visually inspect the node graph on a canvas
- select a node and edit its properties
- save the pipeline back to the backend
- open a chat run from the current pipeline

## Current node authoring surface

For each node, the UI can edit:
- label
- stable key
- node type (`agent`, `tool`, `approval`)
- agent role
- task prompt
- system prompt
- persistent context
- context mode
- canvas position

## Canvas behavior

The current graph canvas is a lightweight custom implementation inside `control-shell.tsx`.
It is not yet a full drag-and-drop graph-editor library.

Current graph features:
- node cards placed using saved `x` and `y` coordinates
- SVG curve rendering for edges
- selected-node state
- panel-driven editing instead of direct-canvas manipulation

## Data contract used by this mode

Backend payload shape comes from shared contracts in:
- `app/shared/src/contracts.ts`

Main pipeline write path:
- `PUT /api/pipelines/:pipelineId`

## Constraints to remember

- pipeline updates currently rebuild nodes and edges on save
- entry node defaults to the first node if not explicitly set
- the UI is enough for the current runtime loop, but not yet a production graph authoring tool

## Good next upgrades

- drag and reposition nodes
- explicit entry-node selection UI
- node deletion and edge deletion
- validation for disconnected graphs and duplicate keys
- clearer visual treatment for approval and tool nodes
- graph ergonomics closer to the reference mockups
