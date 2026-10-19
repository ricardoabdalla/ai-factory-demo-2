# AGENTS.md — ai-factory-demo-2

## Toolchain Registry

| Intent | Command | Kind | Notes |
|---|---|---|---|
| Build | `npm run build` | verify | vite build, gera dist/ |
| Test | `npm test` | verify | build + vitest run sobre dist/index.html |
| Add devDependencies | `npm install --save-dev vite typescript vitest linkedom lucide-static @types/node` | install | TASK-001: as seis devDependencies da spec; gera package-lock.json |
| Install | `npm install` | install | instala node_modules a partir de package.json / package-lock.json |

Do not invent commands beyond this registry.

## Context Map

- `specs/<feature>/spec.md` — the intent under work: the Blueprint says why
- `docs/adrs/` — the decisions that bind your output, each with rationale and revision triggers.

<!-- woba-darkforge:begin -->
<!-- This block is written by the Woba factory engine (v0.2.0). -->
<!-- Edits here are overwritten by `woba-darkforge setup --upgrade`; repository-specific rules belong in the local block below. -->

## Judgment Boundaries

**NEVER**
- `[LAW-SECRETS]` Commit secrets and credentials.
- `[LAW-NEVER-EDIT]` Edit files under `docs/adrs/`, `specs/` — decisions are
  superseded, never rewritten.

**ASK**
- `[LAW-PLAN-FIRST]` **Before writing any code, the Task you build is
  approved:** you build it as written and ask before deviating from it.
- `[LAW-DEVIATION]` Before deviating from the spec the Task points at, or
  from any accepted ADR.

**ALWAYS**
- `[LAW-EVIDENCE]` Report what you ran and what it printed. A claim without
  a command behind it is a guess.

## Approval Records

A human approval only exists, for review purposes, when it is recorded as a
commit trailer. Anything agreed in a chat window and not written into the
history did not happen.

- `[LAW-TASK-APPROVAL-TRAILER]` `Task-approved-by: <name> — <date>` on
  the first implementation commit of an approved Task — the Task gate's
  in-repo footprint.
- `[LAW-REFINEMENT-TRAILER]` `Refinement-approved-by: <name> — <date>` on
  any commit that updates a spec under the Refinement Protocol, alongside
  the spec's changelog entry.
- `[LAW-ADMISSION-TRAILER]` `Admitted-by: <name> — <date>` on the commit
  that adds Toolchain Registry rows at a `builder-denied` stop — the
  owner widening the grant. That commit holds `AGENTS.md` alone and adds
  nothing but Registry rows; you never write it.
- `[LAW-DECISION-TRAILER]` `Decision-approved-by: <name> — <date>` on the
  commit that records an owner decision on violations a critic review
  routed to the owner (`SPEC GAP`). That commit is empty and carries
  `TASK:` too; `woba-darkforge decide` writes it, and you never do.
- `[LAW-BACKLOG-TRAILER]` `Backlog-accepted-by: <name> — <date>` on the
  merge unit `woba-darkforge sign --backlog` writes: the owner signing
  over the findings THE STOP RULE lets go to the backlog, each logged in
  the kaizen register. `sign` writes it, and you never do.
- `[LAW-TASK-TRAILER]` `TASK: TASK-XXX` on every commit of a Task branch —
  each micro-commit and the squashed merge unit — naming the Task under
  work. It is how the history says whose unit a commit is; the belt does
  not park at gate 2 over a range where a commit lacks it.
- `[LAW-NEVER-SIGN]` `Signed-off-by:` is a human act. You never write it,
  and you never amend a commit to add one.

## Commit Discipline (micro-commits)

Commits are your save points: generated code is probabilistic, and coarse
commits force destructive rollbacks when one file out of many carries a
subtle bug. Fine-grained history is your emergency exit, your debugging
context, and the briefing material for your next session.

- `[LAW-MICRO-COMMIT]` **Commit immediately after each discrete task:** a
  Task subtask completed, a single function or module generated, a file
  passing lint or compilation, one test added — any edit producing working
  code.
- `[LAW-MESSAGE-FORMAT]` **Message format:**

  ```
  type(scope): brief description

  - detail 1
  - detail 2
  ```

- `[LAW-ATTRIBUTION]` **Attribution:** your commits carry an
  `Assisted-by:` trailer. Only a human adds `Signed-off-by:` —
  the merge is the governance boundary where human accountability is
  asserted.
- `[LAW-SQUASH]` **Before merge, squash related commits into logical
  units** — but only after validation passes, because squashing removes
  granular rollback points. The merge unit follows the same message format
  and carries the attribution trailer, any approval trailers, and the
  human's `Signed-off-by:`.

## Re-homing Rule
<!-- woba-darkforge:end -->

<!-- woba-darkforge:local:begin -->
<!-- woba-darkforge:local:end -->
