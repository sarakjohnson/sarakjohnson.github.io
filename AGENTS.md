## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

---

## Sara's voice: site copy

Rules for prose that appears on the site (case studies, page copy, the résumé).
The global un-cheese rules in `~/.claude/CLAUDE.md` govern chat replies to Sara.
**Where the two conflict, this file wins for anything a visitor will read.**

That distinction matters. Un-cheese optimizes for a busy colleague who wants the
answer and nothing else. Site copy is doing a different job: it has to sound like a
person worth working with, and stripping it to the bone makes it correct and lifeless.

Derived from Sara's hand edits to the engineering page intro and her interview
answers. Small sample so far; extend it as more of her own prose lands.

### Concede, then pivot

Grant the obvious objection before redirecting. It disarms the reader instead of
putting them on guard.

> Yes, I speak the language: C#, SQL, JavaScript, and more. But reviewing PRs and
> understanding the codebase isn't my superpower.

Sara replaced a combative version of this ("the claim is free, so it is worth
nothing") with the concession. Don't write prose that picks a fight with the reader.

### Concrete nouns, always

"C#, SQL, JavaScript" instead of "the language." `POST startWorkflows` instead of
"one endpoint." Name the specific thing wherever a category would do.

### The full arc beats the tight argument

Given a career narrative, Sara restored all four jobs where a draft had compressed to
two for rhetorical efficiency, and accepted a longer paragraph to do it. In site copy,
completeness of the record wins over economy. This is the clearest place where the
un-cheese instinct is wrong for this context.

### Idiom and wordplay are welcome

"Data integration is my bread and time-to-value is my butter." "Don't call it a career
change" (an LL Cool J allusion whose next line, "I've been here for years," carries the
argument). "The flaws in the toy they'd just unboxed."

Leave these alone. If nothing in a passage would make a reader smile, it is probably
too austere for this site.

### Keep intensifiers that set cadence

"instantly and effortlessly," "obsessively measured," "statistically proven
perfection." The global rule about cutting adverbs targets ones substituting for
precision. These are doing rhythm work. Cut an adverb only when a stronger verb
replaces it, never just to shorten.

### Antithesis to close a thought

"Zooming out, not starting over." "Documenting all 340 endpoints with equal care would
have been the obvious instinct and the wrong one." The `X, not Y` shape lands well in
her voice. Plain words beat clever ones inside it: she chose "zooming out" over
"changed my leverage."

### Growth framing over static framing

"Thirteen years developing a muscle for the same problems," not "thirteen years on one
problem." She thinks in accumulated capability, not fixed position.

### Contractions throughout

"isn't," "don't," "we'd." The register is conversational, not formal.

### Self-critical without flinching

Retrospectives name the mistake plainly and take the hit: "I knew enough to say 'this
will spike before it drops,' and I said the other thing." No hedging, and no
performance of humility either. State it, say what it cost, move on.

### What still applies from un-cheese

- No em-dashes as thought-separators. Numeric ranges (`2025—present`) are fine.
- No AI clichés: "delve," "seamless," "leverage" as a verb, "navigating the
  complexities of."
- No closing paragraph that recaps what the body said.
- Real caveats stay. "In flight, not yet achieved" is the model.

### Sensitive figures

No absolute AbsenceSoft revenue or savings numbers. Ratios and relative framing only
("~2x run rate," "H1 2026 nearly matched all of 2025"). Applies to the $33K/year and
~$5K/month config tooling figures too, whenever that case study gets written.
