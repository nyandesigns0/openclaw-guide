# Chapter 3.3 - A.A.S. Agent Simulation Flowchart

## 3.3.0 Overview

This chapter maps a detailed A.A.S. simulation for how an agent would research, reason, curate, validate, and prepare a Pivot Door Sketch Contest 2026 concept and final presentation board.

### 3.3.1 Simulation Scope

**Scenario:** The operator asks A.A.S. to simulate how an agent would design for the FritsJurgens Pivot Door Sketch Contest 2026 and produce a final concept plus final presentation board. \
**A.A.S. Role:** A.A.S. owns the project truth, WorldState, ontology, affordances, moves, branches, tensions, evaluations, artifacts, approvals, and commitments. \
**Hermes Role:** Hermes receives scoped task packets from A.A.S. and executes bounded research, concept, model, representation, critique, and QA tasks through assigned profiles. \
**Contest Source Context:** The simulation uses the 2026 contest page and brief at `https://sketch.fritsjurgens.com/` and `https://sketch.fritsjurgens.com/FritsJurgens_Pivot_Door_Sketch_Contest_2026_Brief.pdf`. \
**Product Source Context:** The simulation uses FritsJurgens System M+, System Fx, and System One product pages as product-reality references for movement, hold positions, free swing, load range, visible components, floor plate, ceiling plate, top pivot, and bottom pivot logic. \
**Contest Requirements Captured:** The design must be an original pivot door sketch, must incorporate a FritsJurgens pivot system, must make the system clearly visible in the drawing, must be precise enough to be possible to produce, must include a sketch name, must include a detailed concept note, must be submitted as JPEG, PNG, or PDF, and must be judged within student or professional category. \
**Contest Dates Captured:** Entries opened on May 4, 2026, entries close on August 20, 2026, shortlist reveal is planned for mid September 2026, winners are planned for the first week of October 2026, and publication or feature is planned for January 2027. \
**Judging Signals Captured:** The official judging language emphasizes creativity, practicality, aesthetics, and innovation, so A.A.S. treats these as hard rubric families rather than generic inspiration.

### 3.3.2 Agent Operating Contract

**No Chat-Only Truth:** Chat can explain the run, but contest facts, product facts, decisions, artifacts, approvals, and final commitments must be registered in backend records. \
**No Unverified Brief Drift:** Contest requirements must be stored as Object and Boundary nodes with source references before they are used as rubric constraints. \
**No Generic Door Output:** Any branch that treats the pivot hinge as a normal hinge, hides the FritsJurgens system without explanation, or only decorates a conventional slab receives a generic-door penalty. \
**No Pure Fantasy Output:** Any branch that cannot explain weight, swing path, pivot offset, user interaction, material build-up, system choice, and visible pivot logic receives a feasibility penalty. \
**Human Steering Preserved:** The operator can approve, reject, override, annotate, or reopen branch choices, commit decisions, board direction, and final output readiness. \
**Submission Simulation Boundary:** A.A.S. can produce a submission-ready concept packet and board plan in this simulation, but final legal eligibility, account submission, and official terms acceptance remain operator responsibilities.

### 3.3.3 Comprehensive A.A.S. Flowchart

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart TD
    A0(["User goal: simulate a contest-grade pivot door design workflow"])
    A1["Chat workspace receives prompt"]
    A8["Open Architect direction field"]

    subgraph GPS ["Goal And Project Setup"]
        direction TB
        A2["Backend command: create_project_goal"]
        A3["Normalize GoalState"]
        A4["Create project: Pivot Door Sketch Contest 2026"]
        A5["Create session: concept-to-board simulation"]
        A6["Initialize WorldState"]
        A7["Emit event: aas.world.created"]
    end

    A0 ==> A1
    A1 ==> A2
    A2 ==> A3
    A3 ==> A4
    A4 ==> A5
    A5 ==> A6
    A6 ==> A7
    A7 ==> A8

    subgraph SOT ["Backend Source Of Truth"]
        direction TB
        S1[("Product graph")]
        S2[("Runtime event log")]
        S3[("Artifact registry")]
        S4[("Commitment ledger")]
        S5[("Preference store")]
        S6[("Hermes bindings")]
        S7[("WorldState snapshots")]
        S8[("Evaluation records")]
        S9[("Approval records")]
    end

    A6 ==> S1
    A6 ==> S2
    A6 ==> S3
    A6 ==> S4
    A6 ==> S5
    A6 ==> S6
    A6 ==> S7
    A6 ==> S8
    A6 ==> S9

    subgraph GI ["Goal Intake And Brief Decode"]
        direction TB
        GI1["Parse user intent"]
        GI2["Extract desired outputs: concept and board"]
        GI3["Extract success target: strongly place or win"]
        GI4["Extract simulation target: show inner A.A.S. workflow"]
        GI5["Extract contest target: FritsJurgens Pivot Door Sketch Contest 2026"]
        GI6["Extract required process: research, reason, curate, execute"]
        GI7["Detect missing inputs: category, preferred scale, style, region, media"]
        GI8{"Blocking unknown for simulation?"}
        GI9["Ask operator only if missing input blocks legality"]
        GI10["Proceed with explicit default assumptions"]
        GI11["Write GoalState and open questions"]
    end

    A8 ==> GI1
    GI1 ==> GI2
    GI2 ==> GI3
    GI3 ==> GI4
    GI4 ==> GI5
    GI5 ==> GI6
    GI6 ==> GI7
    GI7 ==> GI8
    GI8 -- yes --> GI9
    GI8 -- no --> GI10
    GI9 ==> GI10
    GI10 ==> GI11
    GI11 ==> S1

    subgraph RC ["Research Control Plane"]
        direction TB
        RC1["Generate research move candidates"]
        RC2["Supervisor checks network and source risk"]
        RC3["ContextDistiller creates research brief"]
        RC4["MoveCompiler creates Hermes research task group"]
        RC5["Research Agent reads official contest page"]
        RC6["Research Agent reads 2026 PDF brief"]
        RC7["Research Agent reads System M+ product facts"]
        RC8["Research Agent reads System Fx product facts"]
        RC9["Research Agent reads System One product facts"]
        RC10["Research Agent reads previous sketch highlights"]
        RC11["Research Agent reads pivot door precedents"]
        RC12["Research Agent records source manifest"]
        RC13["Research Agent emits structured research patch"]
    end

    GI11 ==> RC1
    RC1 ==> RC2
    RC2 ==> RC3
    RC3 ==> RC4
    RC4 -.-> RC5
    RC4 -.-> RC6
    RC4 -.-> RC7
    RC4 -.-> RC8
    RC4 -.-> RC9
    RC4 -.-> RC10
    RC4 -.-> RC11
    RC5 -.-> RC12
    RC6 -.-> RC12
    RC7 -.-> RC12
    RC8 -.-> RC12
    RC9 -.-> RC12
    RC10 -.-> RC12
    RC11 -.-> RC12
    RC12 ==> RC13

    subgraph RF ["Contest Facts And Product Facts"]
        direction TB
        F1["Object: entries open May 4 2026"]
        F2["Object: entries close August 20 2026"]
        F3["Object: categories are student and professional"]
        F4["Object: upload format is JPEG PNG or PDF"]
        F5["Object: sketch name required"]
        F6["Object: detailed concept note required"]
        F7["Boundary: original pivot door design"]
        F8["Boundary: FritsJurgens pivot system incorporated"]
        F9["Boundary: pivot system clearly visible in drawing"]
        F10["Boundary: precise enough to be possible to produce"]
        F11["Rubric fact: creativity"]
        F12["Rubric fact: practicality"]
        F13["Rubric fact: aesthetics"]
        F14["Rubric fact: innovation"]
        F15["Product fact: System M+ controlled movement"]
        F16["Product fact: System M+ supports light to heavy doors"]
        F17["Product fact: System Fx has strong hold positions"]
        F18["Product fact: System One is compact free-swing"]
        F19["Product fact: top pivot, ceiling plate, floor plate, bottom pivot"]
        F20["Brand fact: movement, precision, concealed engineering, spatial impact"]
    end

    RC13 ==> F1
    RC13 ==> F2
    RC13 ==> F3
    RC13 ==> F4
    RC13 ==> F5
    RC13 ==> F6
    RC13 ==> F7
    RC13 ==> F8
    RC13 ==> F9
    RC13 ==> F10
    RC13 ==> F11
    RC13 ==> F12
    RC13 ==> F13
    RC13 ==> F14
    RC13 ==> F15
    RC13 ==> F16
    RC13 ==> F17
    RC13 ==> F18
    RC13 ==> F19
    RC13 ==> F20
    F1 ==> S1
    F2 ==> S1
    F3 ==> S1
    F4 ==> S1
    F5 ==> S1
    F6 ==> S1
    F7 ==> S1
    F8 ==> S1
    F9 ==> S1
    F10 ==> S1
    F11 ==> S8
    F12 ==> S8
    F13 ==> S8
    F14 ==> S8
    F15 ==> S1
    F16 ==> S1
    F17 ==> S1
    F18 ==> S1
    F19 ==> S1
    F20 ==> S1

    subgraph ONT ["Architect Ontology Build"]
        direction TB
        O0["Create Object nodes"]
        SB0["Create Subject nodes"]
        V0["Derive Vector nodes"]
        B0["Derive Boundary nodes"]
        SE0["Generate Seed search space"]
        O1["Object: contest brief"]
        O2["Object: FritsJurgens systems"]
        O3["Object: pivot door mechanics"]
        O4["Object: submission format"]
        O5["Object: precedent set"]
        O6["Object: material and fabrication facts"]
        SU1["Subject: jury wants novelty with practicality"]
        SU2["Subject: brand values precise movement"]
        SU3["Subject: operator wants standout concept"]
        SU4["Subject: user experience should be memorable"]
        SU5["Subject: sketch should feel hand-designed"]
        V1["Vector: make movement the core idea"]
        V2["Vector: reveal the pivot system intelligently"]
        V3["Vector: join architectural context and object detail"]
        V4["Vector: balance poetic concept with buildability"]
        V5["Vector: create board clarity at thumbnail scale"]
        B1["Boundary: comply with contest rules"]
        B2["Boundary: show FritsJurgens system"]
        B3["Boundary: explain production logic"]
        B4["Boundary: avoid generic slab door"]
        B5["Boundary: avoid unsupported AI fantasy"]
        B6["Boundary: preserve source uncertainty"]
    end

    F1 ==> O0
    F15 ==> O0
    F20 ==> SB0
    O0 ==> O1
    O0 ==> O2
    O0 ==> O3
    O0 ==> O4
    O0 ==> O5
    O0 ==> O6
    SB0 ==> SU1
    SB0 ==> SU2
    SB0 ==> SU3
    SB0 ==> SU4
    SB0 ==> SU5
    O1 ==> V0
    O2 ==> V0
    O3 ==> V0
    SU1 ==> V0
    SU2 ==> V0
    SU3 ==> V0
    SU4 ==> V0
    V0 ==> V1
    V0 ==> V2
    V0 ==> V3
    V0 ==> V4
    V0 ==> V5
    O1 ==> B0
    O2 ==> B0
    O4 ==> B0
    O6 ==> B0
    B0 ==> B1
    B0 ==> B2
    B0 ==> B3
    B0 ==> B4
    B0 ==> B5
    B0 ==> B6
    V0 ==> SE0
    B0 ==> SE0
    SE0 ==> S1

    subgraph WS ["WorldState Compiler"]
        direction TB
        WS1["Read product graph"]
        WS2["Read event log"]
        WS3["Read artifacts and source manifest"]
        WS4["Read preferences and open questions"]
        WS5["Read approvals and commitments"]
        WS6["Compile GoalState"]
        WS7["Compile IntentState: research to concept"]
        WS8["Compile ProjectState: facts known, concepts absent"]
        WS9["Compile active constraints"]
        WS10["Compile risks and design debt"]
        WS11["Compile artifact gaps"]
        WS12["Write WorldState snapshot"]
    end

    S1 ==> WS1
    S2 ==> WS2
    S3 ==> WS3
    S5 ==> WS4
    S9 ==> WS5
    WS1 ==> WS6
    WS2 ==> WS6
    WS3 ==> WS7
    WS4 ==> WS8
    WS5 ==> WS9
    WS6 ==> WS10
    WS7 ==> WS10
    WS8 ==> WS11
    WS9 ==> WS11
    WS10 ==> WS12
    WS11 ==> WS12
    WS12 ==> S7

    subgraph AF ["Affordance And Supervisor Loop"]
        direction TB
        AF1["AffordanceCompiler reads WorldState"]
        AF2["Match move patterns"]
        AF3["Generate candidate moves"]
        AF4["Filter illegal or premature moves"]
        AF5["Score with IntentGradient"]
        AF6["Diversify top move set"]
        AF7["Expose useful moves"]
        AF8["Record blocked moves and reasons"]
        SG1["Supervisor checks legality"]
        SG2["Supervisor checks approval need"]
        SG3["Supervisor checks source confidence"]
        SG4["Supervisor checks locked commitments"]
        SG5{"Safe to execute?"}
        SG6["Return blocked reason"]
        SG7["Approve move execution"]
    end

    WS12 ==> AF1
    AF1 ==> AF2
    AF2 ==> AF3
    AF3 ==> AF4
    AF4 ==> AF5
    AF5 ==> AF6
    AF6 ==> AF7
    AF4 ==> AF8
    AF7 ==> SG1
    SG1 ==> SG2
    SG2 ==> SG3
    SG3 ==> SG4
    SG4 ==> SG5
    SG5 -- no --> SG6
    SG6 ==> AF8
    SG5 -- yes --> SG7

    subgraph MV ["Initial Move Set"]
        direction TB
        M1["Move: build contest compliance matrix"]
        M2["Move: build FritsJurgens product matrix"]
        M3["Move: build precedent and winner signal map"]
        M4["Move: build weighted judging rubric"]
        M5["Move: spawn concept branches"]
        M6["Move: test branch feasibility"]
        M7["Move: create board strategy"]
    end

    AF7 ==> M1
    AF7 ==> M2
    AF7 ==> M3
    AF7 ==> M4
    AF7 ==> M5
    AF7 ==> M6
    AF7 ==> M7

    subgraph CD ["Context Distiller And Hermes Bridge"]
        direction TB
        CD1["Select relevant Object, Subject, Vector, Boundary, Seed nodes"]
        CD2["Select active constraints and source confidence"]
        CD3["Select artifact gaps and required outputs"]
        CD4["Select source manifest"]
        CD5["Select valid moves"]
        CD6["Attach warnings and approval gates"]
        CD7["Create role-specific Agent Briefs"]
        HB1["MoveCompiler converts moves to task group"]
        HB2["Create Hermes Kanban tasks"]
        HB3["Assign Research Agent"]
        HB4["Assign Concept Agent"]
        HB5["Assign Critic Evaluator"]
        HB6["Assign Model Agent"]
        HB7["Assign Representation Agent"]
        HB8["Assign Supervisor Agent"]
        HB9["Write output contracts"]
        HB10["Watch task logs and artifacts"]
    end

    SG7 ==> CD1
    CD1 ==> CD2
    CD2 ==> CD3
    CD3 ==> CD4
    CD4 ==> CD5
    CD5 ==> CD6
    CD6 ==> CD7
    CD7 ==> HB1
    HB1 ==> HB2
    HB2 -.-> HB3
    HB2 -.-> HB4
    HB2 -.-> HB5
    HB2 -.-> HB6
    HB2 -.-> HB7
    HB2 -.-> HB8
    HB1 ==> HB9
    HB9 ==> HB10
    HB10 ==> S6

    subgraph MAT ["Contest And Product Matrices"]
        direction TB
        CM1["Build compliance matrix"]
        CM2["Map each rule to evidence source"]
        CM3["Mark hard constraints"]
        CM4["Mark soft judging signals"]
        PM1["Compare FritsJurgens systems"]
        PM2{"Need controlled heavy movement?"}
        PM3["Prefer System M+"]
        PM4{"Need stable hold positions?"}
        PM5["Prefer System Fx"]
        PM6{"Need compact free-swing movement?"}
        PM7["Prefer System One"]
        PM8["Create system-choice hypotheses"]
        PM9["Create visible-system drawing requirement"]
    end

    HB3 ==> CM1
    CM1 ==> CM2
    CM2 ==> CM3
    CM3 ==> CM4
    HB3 ==> PM1
    PM1 ==> PM2
    PM2 -- yes --> PM3
    PM2 -- no --> PM4
    PM4 -- yes --> PM5
    PM4 -- no --> PM6
    PM6 -- yes --> PM7
    PM6 -- no --> PM1
    PM3 ==> PM8
    PM5 ==> PM8
    PM7 ==> PM8
    PM8 ==> PM9
    CM4 ==> S8
    PM9 ==> S1

    subgraph RUB ["Weighted Contest Rubric"]
        direction TB
        RU1["Create rubric object"]
        RU2["Creativity score"]
        RU3["Practicality score"]
        RU4["Aesthetics score"]
        RU5["Innovation score"]
        RU6["FritsJurgens system integration score"]
        RU7["Movement experience score"]
        RU8["Sketch communication score"]
        RU9["Concept note clarity score"]
        RU10["Board narrative score"]
        RU11["Feasibility risk penalty"]
        RU12["Generic-door penalty"]
        RU13["Hidden-system penalty"]
        RU14["AI-fantasy penalty"]
        RU15["Store weighted rubric"]
    end

    CM4 ==> RU1
    RU1 ==> RU2
    RU1 ==> RU3
    RU1 ==> RU4
    RU1 ==> RU5
    RU1 ==> RU6
    RU1 ==> RU7
    RU1 ==> RU8
    RU1 ==> RU9
    RU1 ==> RU10
    RU1 ==> RU11
    RU1 ==> RU12
    RU1 ==> RU13
    RU1 ==> RU14
    RU2 ==> RU15
    RU3 ==> RU15
    RU4 ==> RU15
    RU5 ==> RU15
    RU6 ==> RU15
    RU7 ==> RU15
    RU8 ==> RU15
    RU9 ==> RU15
    RU10 ==> RU15
    RU11 ==> RU15
    RU12 ==> RU15
    RU13 ==> RU15
    RU14 ==> RU15
    RU15 ==> S8

    subgraph CB ["Concept Branch Generation"]
        direction TB
        CB0["Concept Agent reads ontology, facts, rubric, and product matrix"]
        CB1["Generate wide branch pool"]
        CB2["Branch A: Threshold Weather Instrument"]
        CB3["Branch B: Rotating Room Divider Furniture"]
        CB4["Branch C: Public Ritual Gate"]
        CB5["Branch D: Light Clock Pivot"]
        CB6["Branch E: Acoustic Privacy Wing"]
        CB7["Branch F: Archive Display Door"]
        CB8["Branch G: Climate Screen Breathing Wall"]
        CB9["Branch H: Courtyard Compass Door"]
        CB10["Attach product hypothesis"]
        CB11["Attach site and use case"]
        CB12["Attach movement sequence"]
        CB13["Attach materials and build-up"]
        CB14["Attach visible-system sketch plan"]
        CB15["Attach risks and unknowns"]
        CB16["Register Seed nodes and branch records"]
    end

    RU15 ==> CB0
    PM9 ==> CB0
    CB0 ==> CB1
    CB1 ==> CB2
    CB1 ==> CB3
    CB1 ==> CB4
    CB1 ==> CB5
    CB1 ==> CB6
    CB1 ==> CB7
    CB1 ==> CB8
    CB1 ==> CB9
    CB2 ==> CB10
    CB3 ==> CB10
    CB4 ==> CB10
    CB5 ==> CB10
    CB6 ==> CB10
    CB7 ==> CB10
    CB8 ==> CB10
    CB9 ==> CB10
    CB10 ==> CB11
    CB11 ==> CB12
    CB12 ==> CB13
    CB13 ==> CB14
    CB14 ==> CB15
    CB15 ==> CB16
    CB16 ==> S1
    CB16 ==> S2

    subgraph BE ["Branch Enrichment Loop"]
        direction TB
        BE1["For each branch define title"]
        BE2["Define narrative hook"]
        BE3["Define architectural context"]
        BE4["Define user interaction"]
        BE5["Define closed half-open open states"]
        BE6["Define pivot offset and swing path"]
        BE7["Define product system and why"]
        BE8["Define visible component callout"]
        BE9["Define material stack"]
        BE10["Define fabrication plausibility"]
        BE11["Define plan elevation section needs"]
        BE12["Define hero sketch composition"]
        BE13["Define board hierarchy"]
        BE14["Create branch brief artifact"]
    end

    CB16 ==> BE1
    BE1 ==> BE2
    BE2 ==> BE3
    BE3 ==> BE4
    BE4 ==> BE5
    BE5 ==> BE6
    BE6 ==> BE7
    BE7 ==> BE8
    BE8 ==> BE9
    BE9 ==> BE10
    BE10 ==> BE11
    BE11 ==> BE12
    BE12 ==> BE13
    BE13 ==> BE14
    BE14 ==> S3

    subgraph TE ["Tension Engine"]
        direction TB
        TE1["Scan contradictions"]
        TE2["Novelty versus buildability"]
        TE3["Concealed hardware versus visible-system rule"]
        TE4["Sketch beauty versus technical clarity"]
        TE5["Poetic story versus product explanation"]
        TE6["Door object versus architectural threshold"]
        TE7["Movement drama versus everyday usability"]
        TE8["Board density versus readability"]
        TE9["Create tension records"]
        TE10["Link tensions to branches"]
        TE11["Generate resolution moves"]
    end

    BE14 ==> TE1
    TE1 ==> TE2
    TE1 ==> TE3
    TE1 ==> TE4
    TE1 ==> TE5
    TE1 ==> TE6
    TE1 ==> TE7
    TE1 ==> TE8
    TE2 ==> TE9
    TE3 ==> TE9
    TE4 ==> TE9
    TE5 ==> TE9
    TE6 ==> TE9
    TE7 ==> TE9
    TE8 ==> TE9
    TE9 ==> TE10
    TE10 ==> TE11
    TE9 ==> S1
    TE9 ==> S2

    subgraph EV1 ["Critic Evaluator Pass One"]
        direction TB
        EV1A["Read all branch briefs"]
        EV1B["Score against weighted rubric"]
        EV1C["Check contest compliance"]
        EV1D["Check FritsJurgens integration"]
        EV1E["Check feasibility and material plausibility"]
        EV1F["Check originality and precedent distance"]
        EV1G["Check sketchability"]
        EV1H["Check board potential"]
        EV1I["Apply penalties"]
        EV1J["Write evaluation artifact"]
        EV1K["Recommend kill, refine, or keep"]
    end

    TE11 ==> EV1A
    EV1A ==> EV1B
    EV1B ==> EV1C
    EV1C ==> EV1D
    EV1D ==> EV1E
    EV1E ==> EV1F
    EV1F ==> EV1G
    EV1G ==> EV1H
    EV1H ==> EV1I
    EV1I ==> EV1J
    EV1J ==> EV1K
    EV1J ==> S8
    EV1K ==> S1

    subgraph CUR ["Branch Curation"]
        direction TB
        CUR1["Sort by score and risk"]
        CUR2["Preserve conceptual diversity"]
        CUR3["Reject generic branches"]
        CUR4["Reject unbuildable branches"]
        CUR5["Keep top three"]
        CUR6["Archive weak branches as history"]
        CUR7["Create top-three comparison artifact"]
        CUR8["Ask operator for approval or override"]
        CUR9{"Operator override?"}
        CUR10["Apply override as approved patch"]
        CUR11["Proceed with top three"]
    end

    EV1K ==> CUR1
    CUR1 ==> CUR2
    CUR2 ==> CUR3
    CUR3 ==> CUR4
    CUR4 ==> CUR5
    CUR3 ==> CUR6
    CUR4 ==> CUR6
    CUR5 ==> CUR7
    CUR7 ==> CUR8
    CUR8 ==> CUR9
    CUR9 -- yes --> CUR10
    CUR9 -- no --> CUR11
    CUR10 ==> CUR11
    CUR6 ==> S1
    CUR7 ==> S3

    subgraph DEV ["Top Three Development"]
        direction TB
        D1["Develop concept one narrative"]
        D2["Develop concept one mechanism detail"]
        D3["Develop concept one sketch package"]
        D4["Develop concept one board thumbnail"]
        D5["Develop concept two narrative"]
        D6["Develop concept two mechanism detail"]
        D7["Develop concept two sketch package"]
        D8["Develop concept two board thumbnail"]
        D9["Develop concept three narrative"]
        D10["Develop concept three mechanism detail"]
        D11["Develop concept three sketch package"]
        D12["Develop concept three board thumbnail"]
        D13["Register developed branch artifacts"]
    end

    CUR11 ==> D1
    D1 ==> D2
    D2 ==> D3
    D3 ==> D4
    D4 ==> D13
    CUR11 ==> D5
    D5 ==> D6
    D6 ==> D7
    D7 ==> D8
    D8 ==> D13
    CUR11 ==> D9
    D9 ==> D10
    D10 ==> D11
    D11 ==> D12
    D12 ==> D13
    D13 ==> S3

    subgraph MOD ["Model And Feasibility Pass"]
        direction TB
        MO1["Model Agent receives top three"]
        MO2["Create simplified pivot geometry"]
        MO3["Check pivot point and offset"]
        MO4["Check swing path"]
        MO5["Check collision envelope"]
        MO6["Check door thickness and weight plausibility"]
        MO7["Check material build-up"]
        MO8["Check selected FritsJurgens system fit"]
        MO9["Check visible component placement"]
        MO10["Generate plan elevation section sequence diagrams"]
        MO11["Flag invalid branch details"]
        MO12["Register model-derived artifacts"]
    end

    D13 ==> MO1
    MO1 ==> MO2
    MO2 ==> MO3
    MO3 ==> MO4
    MO4 ==> MO5
    MO5 ==> MO6
    MO6 ==> MO7
    MO7 ==> MO8
    MO8 ==> MO9
    MO9 ==> MO10
    MO10 ==> MO12
    MO8 ==> MO11
    MO11 ==> TE9
    MO12 ==> S3

    subgraph EV2 ["Critic Evaluator Pass Two"]
        direction TB
        EV2A["Compare top three after feasibility"]
        EV2B["Score narrative clarity"]
        EV2C["Score movement originality"]
        EV2D["Score FritsJurgens integration"]
        EV2E["Score material intelligence"]
        EV2F["Score presentation potential"]
        EV2G["Score production plausibility"]
        EV2H["Score contest differentiation"]
        EV2I["Select strongest concept"]
        EV2J["Write final comparison memo"]
        EV2K["Generate commit affordance"]
    end

    MO12 ==> EV2A
    EV2A ==> EV2B
    EV2B ==> EV2C
    EV2C ==> EV2D
    EV2D ==> EV2E
    EV2E ==> EV2F
    EV2F ==> EV2G
    EV2G ==> EV2H
    EV2H ==> EV2I
    EV2I ==> EV2J
    EV2J ==> EV2K
    EV2J ==> S8

    subgraph COM ["Commitment Ledger"]
        direction TB
        CO1["Supervisor checks critical tensions"]
        CO2{"Critical unresolved tension?"}
        CO3["Return to resolution moves"]
        CO4["Prepare commit proposal"]
        CO5["Commit selected concept"]
        CO6["Commit rationale"]
        CO7["Commit product system"]
        CO8["Commit material direction"]
        CO9["Commit board deliverables"]
        CO10["Request operator approval"]
        CO11{"Approved?"}
        CO12["Commit becomes project truth"]
        CO13["Rejected: return to comparison"]
    end

    EV2K ==> CO1
    CO1 ==> CO2
    CO2 -- yes --> CO3
    CO3 ==> TE11
    CO2 -- no --> CO4
    CO4 ==> CO5
    CO5 ==> CO6
    CO6 ==> CO7
    CO7 ==> CO8
    CO8 ==> CO9
    CO9 ==> CO10
    CO10 ==> CO11
    CO11 -- yes --> CO12
    CO11 -- no --> CO13
    CO12 ==> S4
    CO13 ==> CUR7

    subgraph WCP ["Winning Concept Packet"]
        direction TB
        W1["Generate final concept title"]
        W2["Generate one-sentence thesis"]
        W3["Write 150 to 250 word concept note"]
        W4["State inspiration"]
        W5["State where it lives"]
        W6["State why it matters"]
        W7["State FritsJurgens system and reason"]
        W8["State material and production logic"]
        W9["State movement sequence"]
        W10["State required sketch views"]
        W11["Create final concept packet"]
    end

    CO12 ==> W1
    W1 ==> W2
    W2 ==> W3
    W3 ==> W4
    W4 ==> W5
    W5 ==> W6
    W6 ==> W7
    W7 ==> W8
    W8 ==> W9
    W9 ==> W10
    W10 ==> W11
    W11 ==> S3

    subgraph DRAW ["Draw Mode Board Production"]
        direction TB
        DR0["Representation Agent enters Draw Mode"]
        DR1["Create board strategy"]
        DR2["Choose simulated board format"]
        DR3["Define visual hierarchy"]
        DR4["Hero sketch: door in architectural context"]
        DR5["Detail sketch: visible pivot system"]
        DR6["Plan diagram: swing path and pivot point"]
        DR7["Sequence diagram: closed half-open open"]
        DR8["Material diagram: layers and texture"]
        DR9["Use-case vignette"]
        DR10["Concept note placement"]
        DR11["Product-system callout"]
        DR12["Annotations and scale"]
        DR13["Margins, title, and metadata"]
        DR14["Assemble board package"]
        DR15["Register board draft"]
    end

    W11 ==> DR0
    DR0 ==> DR1
    DR1 ==> DR2
    DR2 ==> DR3
    DR3 ==> DR4
    DR3 ==> DR5
    DR3 ==> DR6
    DR3 ==> DR7
    DR3 ==> DR8
    DR3 ==> DR9
    DR3 ==> DR10
    DR3 ==> DR11
    DR3 ==> DR12
    DR3 ==> DR13
    DR4 ==> DR14
    DR5 ==> DR14
    DR6 ==> DR14
    DR7 ==> DR14
    DR8 ==> DR14
    DR9 ==> DR14
    DR10 ==> DR14
    DR11 ==> DR14
    DR12 ==> DR14
    DR13 ==> DR14
    DR14 ==> DR15
    DR15 ==> S3

    subgraph SK ["Sketch Language Control"]
        direction TB
        SK1["Check hand-sketch character"]
        SK2["Check line-weight hierarchy"]
        SK3["Check perspective clarity"]
        SK4["Check technical readability"]
        SK5["Check no generic render look"]
        SK6["Check visible FritsJurgens system"]
        SK7["Check human scale"]
        SK8["Check material tactility"]
        SK9["Check movement arrows"]
        SK10["Check annotation density"]
        SK11["Update sketch art direction"]
    end

    DR15 ==> SK1
    SK1 ==> SK2
    SK2 ==> SK3
    SK3 ==> SK4
    SK4 ==> SK5
    SK5 ==> SK6
    SK6 ==> SK7
    SK7 ==> SK8
    SK8 ==> SK9
    SK9 ==> SK10
    SK10 ==> SK11
    SK11 ==> DR14

    subgraph QA ["Final QA And Validation Gates"]
        direction TB
        QA1["Supervisor starts final QA"]
        QA2["Check contest requirement coverage"]
        QA3["Check sketch name exists"]
        QA4["Check concept note exists"]
        QA5["Check selected system is named"]
        QA6["Check pivot system is visible"]
        QA7["Check drawing is precise enough to produce"]
        QA8["Check inspiration, context, and purpose"]
        QA9["Check feasibility proof exists"]
        QA10["Check board readable at thumbnail"]
        QA11["Check originality and generic penalty"]
        QA12["Check spelling, labels, dates, and source notes"]
        QA13["Check format assumptions: JPEG PNG PDF"]
        QA14["Check artifact lineage"]
        QA15["Check no critical unresolved tensions"]
        QA16{"Pass?"}
        QA17["Create fix affordances"]
        QA18["Approve final board"]
    end

    DR15 ==> QA1
    QA1 ==> QA2
    QA2 ==> QA3
    QA3 ==> QA4
    QA4 ==> QA5
    QA5 ==> QA6
    QA6 ==> QA7
    QA7 ==> QA8
    QA8 ==> QA9
    QA9 ==> QA10
    QA10 ==> QA11
    QA11 ==> QA12
    QA12 ==> QA13
    QA13 ==> QA14
    QA14 ==> QA15
    QA15 ==> QA16
    QA16 -- no --> QA17
    QA17 ==> AF7
    QA16 -- yes --> QA18

    subgraph EXP ["Export And Delivery"]
        direction TB
        EX1["Create final board export"]
        EX2["Create final concept note export"]
        EX3["Create source package"]
        EX4["Create submission checklist"]
        EX5["Create final WorldState snapshot"]
        EX6["Emit event: aas.artifact.created"]
        EX7["Emit event: aas.commit.created"]
        EX8["Emit event: aas.delivery.ready"]
        EX9(["Final output: submission-ready concept and presentation board"])
    end

    QA18 ==> EX1
    EX1 ==> EX2
    EX2 ==> EX3
    EX3 ==> EX4
    EX4 ==> EX5
    EX5 ==> EX6
    EX6 ==> EX7
    EX7 ==> EX8
    EX8 ==> EX9
    EX1 ==> S3
    EX2 ==> S3
    EX3 ==> S3
    EX5 ==> S7
    EX7 ==> S4

    subgraph UI ["Four Workspace Visibility"]
        direction TB
        UI1["Chat shows reasoning, questions, approvals, status"]
        UI2["Architect shows nodes, branches, tensions, commits"]
        UI3["Model shows pivot geometry and feasibility"]
        UI4["Draw shows board, sketches, annotations"]
        UI5["Inspector shows scores, links, artifacts, JSON"]
        UI6["Event stream shows move progress"]
    end

    S2 ==> UI1
    S1 ==> UI2
    S3 ==> UI3
    S3 ==> UI4
    S8 ==> UI5
    S2 ==> UI6
    UI1 ==> A1
    UI2 ==> A8
    UI3 ==> MOD
    UI4 ==> DRAW

    subgraph LL ["Learning And Pattern Statistics"]
        direction TB
        LL1["Compare predicted move effect to evaluator result"]
        LL2["Update move pattern stats"]
        LL3["Update sensitivity matrix"]
        LL4["Record branch failures"]
        LL5["Record successful concept signals"]
        LL6["Improve future affordance ranking"]
        LL7["Do not treat model weights as project truth"]
    end

    EV1J ==> LL1
    EV2J ==> LL1
    QA18 ==> LL1
    LL1 ==> LL2
    LL2 ==> LL3
    LL3 ==> LL4
    LL4 ==> LL5
    LL5 ==> LL6
    LL6 ==> LL7
    LL6 ==> AF5

    subgraph REC ["Failure And Recovery"]
        direction TB
        RE1{"Research missing?"}
        RE2["Create research retry move"]
        RE3{"Branch pool weak?"}
        RE4["Spawn new branches"]
        RE5{"Model invalid?"}
        RE6["Refine geometry, material, or system choice"]
        RE7{"Board unclear?"}
        RE8["Recompose board hierarchy"]
        RE9{"Operator rejects commit?"}
        RE10["Return to top-three comparison"]
    end

    RC13 ==> RE1
    RE1 -- yes --> RE2
    RE2 ==> HB3
    EV1K ==> RE3
    RE3 -- yes --> RE4
    RE4 ==> CB1
    MO11 ==> RE5
    RE5 -- yes --> RE6
    RE6 ==> DEV
    QA16 ==> RE7
    RE7 -- yes --> RE8
    RE8 ==> DRAW
    CO11 ==> RE9
    RE9 -- yes --> RE10
    RE10 ==> CUR7

    EX9 ==> END(["A.A.S. state: delivered package, committed concept, traceable decision history"])
    END ==> S7

    style A0 fill:#7f1d1d,stroke:#fecaca,color:#ffffff,stroke-width:4px
    linkStyle 0,1,2,3,4,5,6,7 stroke:#818cf8,stroke-width:4px
    linkStyle 8,9,10,11,12,13,14,15,16 stroke:#818cf8,stroke-width:2px
```

### 3.3.4 Data Interpretation Notes

**Object Data:** Contest facts, product specifications, dates, formats, judging language, and mechanical realities enter A.A.S. as Object nodes because they are external facts the design must acknowledge. \
**Subject Data:** Jury desire, brand atmosphere, operator ambition, sketch character, and emotional target enter A.A.S. as Subject nodes because they describe human judgment and experience. \
**Vector Data:** Movement, visibility, spatial impact, technical clarity, and board readability become Vector nodes because they push the design toward a particular kind of outcome. \
**Boundary Data:** Contest rules, visible-system requirement, production plausibility, format assumptions, and anti-generic constraints become Boundary nodes because they contain the design field. \
**Seed Data:** Concept branches become Seed nodes only after Object, Subject, Vector, and Boundary pressure has shaped the search space.

### 3.3.5 Final Board Output Logic

**Concept Packet:** A.A.S. treats the title, thesis, concept note, inspiration, location, purpose, system selection, material logic, movement sequence, and required sketch views as structured output before board assembly begins. \
**Board Package:** Draw Mode assembles hero sketch, pivot detail, plan swing diagram, movement sequence, material build-up, human-scale vignette, concept note, product callout, annotations, margins, title, and metadata into a deterministic board package. \
**Validation:** Final QA blocks delivery unless contest requirements, visible FritsJurgens integration, feasibility proof, concept note content, board readability, file-format assumptions, and artifact lineage are all satisfied. \
**Traceability:** The delivered package remains linked to research sources, branch records, evaluator scores, model checks, user approvals, and final commitments so the final design can be explained instead of merely displayed.
