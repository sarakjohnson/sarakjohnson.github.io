---
title: Making a five-year-old API sellable
company: AbsenceSoft
role: Senior Technical Product Manager
period: 2025—present
teamSize: 3—8 developers, 1—2 QA
oneLiner: >-
  Three hundred and forty endpoints, five years of active development, and eight
  customers using them. The gap was never in the API.
roleType: product
order: 1
featured: true
draft: false
stack: [OpenAPI 3, Stoplight, Swagger, REST, YAML]
metrics:
  - value: '~2×'
    label: New API ARR run rate
    note: H1 2026 nearly matched all of 2025 — the same revenue in half the time
  - value: 20 → 5
    label: Target professional-services hours per integration
    note: By end of Q1 2027 — in flight, not yet achieved
  - value: '340'
    label: Endpoints documented
    note: Request and response payloads, translated from loose Swagger to strict OpenAPI
---

## Context

AbsenceSoft's API was, on paper, finished. Three hundred and forty endpoints at
functional parity with the product, five years of continuous development behind
them, and a Swagger spec that described every one.

It had eight active customers.

Sales and implementation couldn't speak to API functionality in any depth, so the
answer to "can we integrate?" defaulted to flat-file feeds on a daily sync. That
answer lost us deals. The customers we were losing were the API-first ones — buyers
whose engineering organizations had to sign off on the choice, and who needed
something more than a flat file to justify it.

## Problem

The Swagger documentation described endpoints accurately. What it never did was
describe an integration.

A prospect could read it and learn that `POST /employee` existed without learning
what a working employee-sync integration looked like, which calls it required, or
in what order. Nobody could get from the reference to a plan.

Beyond the lost deals, the cost showed up in two places. Every customer who began
API development generated a run of support tickets, and because no internal
resource existed to answer them, they escalated straight to tier four engineering —
the most expensive people in the building. And internally, the teams who needed to
sell the thing had nothing to learn from.

> It looked like a documentation gap. It was a product gap. The docs were
> organized around our endpoints, and every buyer was thinking in integration
> scenarios.

## Constraints

Engineering wanted to stay on Swagger, and the reason was legitimate: code-to-spec
generation made deployment nearly free. Moving to an authored spec meant giving
that up. The counter-pressure came from the customer-facing side of the org, which
needed material it could hand a prospect without pulling a developer onto every
call.

Two technical constraints shaped the build. The portal had a hard limit on the
repository side that we hit before the first iteration could go live, which took a
non-obvious deployment approach to get around. And the translation from Swagger to
OpenAPI was not mechanical — our existing specs were loose in ways that only
surface when you try to make them strict. Deciding whether a payload was `allOf`
or `anyOf`, or whether a field was an integer or an enumerated integer, changes
what the spec actually promises a consumer.

Having written this kind of code for years, I could make those calls directly
rather than routing each one to an engineer. A non-technical PM would have either
stalled on them or guessed, and guessing wrong in a spec is worse than leaving it
undocumented — it produces confident, incorrect client code.

## Approach

I started by measuring instead of assuming. I pulled 2025 call volume, call rate,
and call sequencing across every consumer, then interviewed our five largest API
customers about their use cases, their development experience, and what they
wanted next.

The finding that reframed the project: our fifth-largest consumer was using exactly
one endpoint in the entire suite — `POST startWorkflows`. Value was concentrated in
a handful of calls, not spread across the surface. Documenting all 340 endpoints
with equal care would have been the obvious instinct and the wrong one.

So the P0 came from measured usage rather than from the endpoint inventory.
`POST Employee`, `PUT Employer`, and `GET Case` were the heaviest by a wide margin,
and they got the first round of real documentation — valid examples, how feature
configuration changes behavior, and how each call fits the larger picture of
AbsenceSoft as a system.

I chose Stoplight for three reasons: it let us build outside the existing SDLC
pipeline, business users could actually work in it, and its shared models pushed
us toward consistent resource representation across the API surface. The tradeoff
I took explicitly was engineering's code-to-spec deployment ease, in exchange for
material a customer could use without a developer on every call.

### Spec-first

The deeper change was to how API work got designed at all.

The old sequence was code-first, document-later, and often document-never. Customer
success took in a request, product prioritized it, and engineering designed it
however they saw fit. By the time it reached the customer it was a coin flip
whether we'd hit the mark, and we have a few black eyes from the times we didn't —
each one paid for with a development cycle spent iterating on functionality we had
already built once.

Spec-first inverted it. Product declares the design and walks the customer through
it line by line before an engineer touches a keyboard. Because the spec became the
source of truth, the document-never outcome stopped being possible: documentation
became the expectation rather than a go-to-market afterthought.

## What shipped

A public developer portal covering all 340 endpoints with documented request and
response payloads, built on authored OpenAPI rather than generated Swagger.

Alongside the reference, end-to-end use case documentation organized around what
customers were actually trying to accomplish — derived from the usage data and the
consumer interviews, not from the endpoint list.

And the spec-first process, which outlasts any particular document.

You can read the portal at
[absencesoft.stoplight.io](https://absencesoft.stoplight.io/docs/api-specs/46b38f624d360-welcome-to-the-absence-soft-api).

## Impact

Halfway through 2026, new API ARR has nearly matched the total for all of 2025.
New API sales and customer interest are at an all-time high.

We're still tracking the professional-services number, which is the one I care most
about: the hours a business specialist has to spend to get a customer to a working
integration. Baseline was twenty. The target is five by the end of Q1 2027. That
one is in flight, not achieved.

The second-order effects have been the more interesting ones. Making the API
legible surfaced demand for functionality nobody had ever asked for, because nobody
had previously been able to see what was missing. It also surfaced defects that had
sat undiscovered for years. A significant share of the 2026 roadmap is now dedicated
to what this first pass turned up.

## Retrospective

I set the wrong expectation, and I set it early.

I told our professional services team that their level of engagement would have to
stay flat for a while before it improved. What actually happened is that it got
worse before it got better. New API sales climbing meant a wave of excited new
users discovering the flaws in the toy they'd just unboxed — and every one of those
discoveries landed on the same team I'd promised a plateau to.

The pain is worth it; the learnings are rich and they're funding the roadmap. But
"this will hold steady" and "this will spike before it drops" are very different
things to hear when you're the one absorbing it, and I knew enough to say the
second one.

The other lesson is about time. Five years of technical debt from an undocumented
API does not resolve in six months, and framing the portal as a launch rather than
the first pass of a longer program set everyone up to measure it on the wrong
horizon.
