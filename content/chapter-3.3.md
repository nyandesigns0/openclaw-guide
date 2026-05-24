# Chapter 3.3 - Design Ontology

## 3.3.0 Overview

This chapter defines the primary node ontology for A.A.S. Architect Mode. The ontology is intentionally small: Object, Subject, Vector, Boundary, and Seed. These are hard-coded primary node types, not workflow objects, file categories, UI states, or implementation tables. They define what kind of design matter exists in the field.

Subcategories are not hard-coded ontology. They are live library terms: project-specific, user-specific, client-specific, or firm-wide vocabulary that can be added, merged, archived, cleaned, and consolidated over time. Hermes-like maintenance workflows may govern subcategories, but normal workflow should not create new primary node types.

### 3.3.1 Primary Node Grammar

**Object:** Objective truth, outside reality, and what is externally measurable or observable. Object grounds design in facts the project must acknowledge. \
**Subject:** Subjective truth, inside reality, and what is felt, wanted, remembered, valued, feared, preferred, or perceived. Subject gives design human meaning. \
**Vector:** Pushing force, directional desire, and what the design should move toward. Vector translates Object and Subject inputs into decision pressure. \
**Boundary:** Restricting force, finite frame, and what the design must stay within or must not violate. Boundary translates Object and Subject inputs into limits. \
**Seed:** Generated possibility and what the design could become. Seed is produced design material under the influence of Object, Subject, Vector, and Boundary.

```text
Object + Subject -> Vector + Boundary -> Seed
```

### 3.3.2 Object

**Meaning:** Objective truth, outside reality, and what is. \
**Use:** Object nodes contain external, realist, measurable, observable, or accepted facts. They describe world conditions the project must acknowledge. \
**Common Subcategories:** Site, context, climate, infrastructure, existing condition, legal condition, material reality, measured data, code fact, physical constraint, surrounding system, environmental condition, and temporal condition. \
**Question Answered:** What is true outside us?

### 3.3.3 Subject

**Meaning:** Subjective truth, inside reality, and what is felt, wanted, remembered, valued, or perceived. \
**Use:** Subject nodes contain relativist, human, experiential, cultural, emotional, or preference-based facts. They describe internal reality for users, clients, designers, communities, and stakeholders. \
**Common Subcategories:** User need, client vision, designer taste, memory, fear, comfort, ambition, identity, cultural position, atmosphere preference, social expectation, lived experience, and emotional response. \
**Question Answered:** What is true inside us?

### 3.3.4 Vector

**Meaning:** Pushing force, directional desire, and what should move. \
**Use:** Vector nodes translate Object and Subject inputs into design direction. They are not facts alone; they bias decision-making toward certain outcomes. \
**Common Subcategories:** Aspiration, performance target, aesthetic direction, atmosphere goal, sustainability aim, comfort goal, identity goal, elegance goal, experience quality, long-term vision, innovation pressure, user priority, and client priority. \
**Question Answered:** Where should the design move?

### 3.3.5 Boundary

**Meaning:** Restricting force, finite frame, and must or must not. \
**Use:** Boundary nodes translate Object and Subject inputs into limits. They define the finite project frame: practical, legal, physical, temporal, economic, ethical, experiential, or conceptual. \
**Common Subcategories:** Code limit, zoning limit, budget limit, schedule limit, site limit, structural limit, access rule, fabrication limit, safety threshold, client non-negotiable, preservation requirement, operational limit, and comfort threshold. \
**Question Answered:** What must contain the design?

### 3.3.6 Seed

**Meaning:** Generated possibility and what could be. \
**Use:** Seed nodes are generated design material. They are not raw input facts. They are produced by the system, designer, or agent as possible architecture under the influence of Object, Subject, Vector, and Boundary. \
**Common Subcategories:** Concept, scheme, spatial strategy, massing idea, form gesture, atmosphere direction, material strategy, system idea, detail idea, reference interpretation, option branch, iteration, and variation. \
**Question Answered:** What could the design become?

### 3.3.7 Live Subcategory Governance

**Hard Primitives:** Object, Subject, Vector, Boundary, and Seed are fixed semantic backbone. \
**Live Subcategories:** Subcategories are mutable project vocabulary. They behave more like governed tags than ontology. \
**Governance Actions:** Agents may propose subcategories, merge duplicates, archive unused terms, restore useful terms, and consolidate client or firm vocabulary. \
**Maintenance Rule:** Cron-style maintenance can review unused projects, stale subcategories, duplicate terms, or overgrown vocabularies. It may clean subcategories but must not add primary node types. \
**Migration Rule:** New primary node types require explicit ontology migration, documentation update, schema migration, UI review, and compatibility handling.

### 3.3.8 Persistence Mapping

**Canonical Row:** Every Architect Mode node is stored as a row in `direction_nodes`. The row carries `project_id`, `primary_type`, `secondary_type_id`, title, summary, confidence, status, position, weight, lock state, creator/updater, and version. \
**Primary Type Field:** The five hard primitives are stored in `primary_type` as Object, Subject, Vector, Boundary, or Seed. This field is not user-extensible during normal workflow. \
**Subcategory Field:** Mutable vocabulary is stored through `secondary_type_id` pointing to governed `node_subcategories`. Subcategories can be proposed, merged, archived, restored, and renamed without changing primary ontology. \
**Relationship Rows:** Links are stored in `direction_links` with source node, target node, relation type, strength, confidence, creator, and version. Links are relations, not nodes. \
**Evented Changes:** Creating, updating, moving, linking, locking, merging, splitting, or changing status writes graph rows and runtime events through backend commands.

### 3.3.9 What Is Not a Primary Node

**Files:** Drawings, PDFs, models, renders, images, notes, and documents are payloads, evidence, references, or artifacts. File format is not ontology. \
**State:** State is the full field snapshot: node layout, active branches, locks, relationships, confidence, direction history, and runtime status. \
**Move:** Move is an operation applied to the field. Move primitives, move patterns, and move instances are runtime objects, not stable field matter or primary ontology nodes. \
**Option:** Option is a Seed subcategory, Seed family, or branch condition. \
**Risk:** Risk is a tag, condition, warning, or subcategory that can attach to Object, Subject, Vector, Boundary, or Seed depending on where danger lives. \
**Question:** Question is uncertainty, missing knowledge, or low-confidence status attached to another node or relation. \
**Link:** Link is a relation between nodes: influence, dependency, contradiction, lineage, evidence, transformation, reference, or output flow.

### 3.3.10 Short Grammar

Object grounds reality. \
Subject gives meaning. \
Vector pushes direction. \
Boundary defines finitude. \
Seed becomes architecture.
