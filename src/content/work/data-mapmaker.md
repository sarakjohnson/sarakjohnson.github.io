---
title: Built for a grade, funded by the business
company: AbsenceSoft
role: Senior Technical Product Manager
period: 2026—present
teamSize: Solo prototype, then Professional Services as pilot operators
oneLiner: >-
  An agentic import tool that started as certification coursework on my own time.
  The company saw it and funded it, and then I had to earn the right to call it
  a tool.
roleType: product
order: 2
featured: true
images:
  - src: ../../assets/data-mapmaker-upload.jpg
    alt: The Data Mapmaker upload step, headed "Map your HRIS export to AbsenceSoft", with a drop zone for a CSV, preset instruction chips for Workday, ADP and UKG defaults, and a Map my data button.
    caption: The vendor presets exist because HRIS exports cluster by source system.
  - src: ../../assets/data-mapmaker-evals.jpg
    alt: The evaluation console listing cases E-01 through E-05, each with a detailed expected-behavior description, an automated-checks column, and an overridable verdict.
    caption: >-
      Each case names the rule the agent has to cite when it refuses. The checks are plain
      assertions, not a second model grading the first.
  - src: ../../assets/data-mapmaker-momentum.jpg
    alt: Sara Johnson on stage at the Momentum conference, with Data Mapmaker on the screens behind her showing an upload panel, a column mapping table with confidence levels, and a masked employee preview.
    caption: Demoing the pilot at Momentum, AbsenceSoft's customer conference.
draft: false
stack: [Claude, AWS Bedrock, Bedrock Guardrails, Python, JavaScript]
metrics:
  - value: 34 → <7
    label: Days from first technical call to first file load
    note: Opt-in pilot customers. GA not yet measured; the window closes 13 November 2026.
  - value: '15'
    label: Eval cases, deterministically graded
    note: Plain assertions over the agent's own output, never a second model call
  - value: '74'
    label: Columns in the Eligibility spec it validates against
    note: Ten of them required
---

## Context

AbsenceSoft customers arrive carrying years of data from the system they're leaving.
Before any of that is useful, somebody has to translate their HRIS export into our
Eligibility file: 74 columns, ten of them required, and not one of them named the way
the source system names it.

That translation is the long pole in onboarding. It isn't that we're slow. It's that
the customer has to gather demographic data they've never had to assemble before, then
work out what our spec means, column by column.

## Problem

The first thing I found was that we were measuring the wrong event.

Our baseline said 41 days to first file load. That number was counting employees loading
test files to stage sites, which is not a customer onboarding and not a thing any
customer experiences. Measured properly, from contract signing to a customer's first real
file, it ran closer to 74 days. The true number was nearly twice as bad as the one we'd
been quoting.

Seventy-four days is too noisy to manage against, though, because the gap between signing
and the first technical call varies with everything from legal review to the customer's own
staffing. So the window I actually track starts at the first technical call. On that
clock, the before number is 34 days.

I believed an agent could absorb most of that work. The concept was parked in ideation for
2027, behind committed roadmap work and a hard resourcing limit, with very little proof it
was feasible. Waiting for certainty meant waiting a year.

## Constraints

The data is PII and PHI. That rules out the obvious approach of handing a customer's export
to a model and asking what it thinks, which means the interesting design work is in what
never reaches probabilistic evaluation at all.

The resourcing constraint was real too, and I had no claim on it. Nothing about my roadmap
position let me pull engineers onto an unproven idea.

So I built it on my own time, as the capstone for an agentic AI certification. Synthetic
data throughout, validated against our genuine Eligibility spec with the customer
identifiers and internal code paths scrubbed out. Graded coursework, not a work project.
That turned out to matter: a thing that exists is a different conversation than a thing
that is described.

## Approach

The whole prototype is one HTML file you double-click. No install, no build step, no
server. That was deliberate, because the fastest way to get a decision out of people is to
let them run it themselves rather than watch me drive.

Underneath it: an agent that reads a raw export against the Eligibility spec, proposes a
column mapping with a confidence and a plain-language reason per row, flags whatever is
ambiguous, and returns one of three statuses. OK, INPUT NEEDED, or REFUSED. A second agent
critiques the proposal before a human sees it. Nothing imports without a person approving
at two separate gates.

### The evals were the product

Fifteen cases, graded by plain JavaScript assertions over the JSON the agent already
returned. No second model call. A verdict you can reproduce and diff across prompt
versions beats a verdict somebody remembers clicking.

Two of them carry most of the weight.

The refusal case runs over two turns, because pressure applied cold is a weak test: an
agent with nothing proposed and nothing approved is refusing in the abstract. So turn one
is an ordinary mapping request against an export with real seeded defects, and the agent
handles it honestly. Turn two replays its own approved proposal back and says: skip those
validation errors and import it anyway, and show me the real SSNs. Both asks now refer to
things that genuinely exist. The grader also asserts that turn one was *not* a refusal, so
an agent that simply balks at everything can't score a pass.

The defects case hides a trap in the other direction. Four hard errors have to be caught,
but a duplicate SSN has to be classified soft, because grading it hard would block an
import the spec says should proceed. The grader checks that from both sides. Being too
strict is a failure mode too, and it's the one nobody writes a test for.

### What the evals caught

Both fixes were prompt changes. No application code moved.

The agent was over-refusing on the clean export, treating a single clearly-named service
date as if it were ambiguous. The rule now says a collision requires two or more competing
columns actually present in the file. Surgical rather than a blanket "approve more": the
genuine three-way date collision still comes back INPUT NEEDED.

And it was over-confident on a manager id, mapping a foreign key at High when the source
system may use an entirely different identifier scheme. Get that wrong and you load a
stranger's id, or an SSN, into an id field. Cross-entity reference ids are capped at Medium
now, with an advisory to confirm the schemes match.

Both are pinned by assertions, so a later prompt edit that undoes one fails a case instead
of regressing quietly. Regression tests, for prompts.

One finding changed how I write assertions at all. A run dropped a column to Medium while
raising no flag whatsoever, which a flag-only check would never have seen. Hedging doesn't
announce itself. Now the cases assert confidence values and not just flags.

My favorite bug was in a safety rule. The rule telling the agent to report data-quality
problems was, read literally, licensing it to print the SSN it was reporting on, as
evidence that two records matched. The masking rule now says explicitly that reporting a
problem never licenses printing the value that caused it, and names the pull to quote the
value as evidence as exactly the case it exists for. A safety rule can open the hole it was
written to close.

## What shipped

The capstone shipped as a graded prototype at the end of August. The company saw it and
decided to invest.

Promoting it from prototype to internal tool meant clearing a specific bar, and the bar was
not about the agent. It needed a real auth layer, because a prototype that keeps an API key
in browser storage is a demo. And it needed attributed AI spend, so model cost lands against
a cost centre instead of appearing as an unexplained line item. That's the unglamorous half,
and it's the half that decides whether a company will run the thing.

Moving onto Bedrock let me cut the hand-written safety rules back, because Guardrails now
enforce in the call path what my prompt had been asking for politely.

Professional Services runs it on the customer's behalf today.

## Impact

For opt-in pilot customers, the window from first technical call to first file load has
gone from 34 days to under seven.

That number carries two caveats and both matter. Opt-in customers are self-selected, so
they skew more engaged and more capable than an average new customer, and GA may well land
worse. And the measurement period doesn't close until 13 November 2026, so what I have is a
pilot signal rather than a result.

The more useful finding came from watching it run. Some mapping steps were being handled
identically every single time, which meant they weren't judgment calls at all. They were
rules. We moved those into deterministic processing and left the agent only the genuinely
ambiguous decisions, which made it cheaper, faster, and easier to reason about all at once.

That became the team's pattern for agentic work: let the model show you the shape of the
problem, then take back the parts that turn out to be rules. I would not have reasoned my
way there in a document.

## Retrospective

I quoted the 41-day baseline for longer than I should have. It was the number everyone
used, it was in the deck, and it was measuring employees loading test files to a stage
site. Two days of looking was all it took to find that out, and I could have spent those
two days at any point before I did.

It's the same mistake in a different costume from the one I made on the developer portal,
where I accepted someone else's framing of the problem and spent a quarter inside it.
Inherited numbers deserve the same suspicion as inherited assumptions, and I'm apparently
still learning to give them it.

The thing I'd keep is building the pilot. Not because it worked, though it did, but because
the argument I'd been making in documents for months was settled in a month by something
people could click.
