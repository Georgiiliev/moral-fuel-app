# Content review checklist

For the qualified human reviewer (theology and pastoral care) who approves Moral Fuel lessons before a
public release. All 30 lessons are currently `EDITORIAL_DRAFT`: written with AI assistance by the
editorial process described in `AGENTS.md`, with every Bible reference checked by the editor, but not
yet reviewed by a theologian.

## How to review a lesson

Lessons live in `src/content/lessons/day-NN.ts`, one file per day. Each has, in Dutch:
title, summary, objective, then **Leer** (big idea, passage summary, context, explanation, everyday
example, optional tradition note and care note), **Overdenk** (question, hint) and **Leef** (action,
optional prayer).

Read the lesson in the app as well as in the file: the app shows the sections in the order a beginner
meets them.

### 1. Scripture

- [ ] The main passage and every related passage exist and say what the lesson claims (book, chapter,
      verses; Psalms use Dutch NBV21 numbering, whole-chapter references are allowed).
- [ ] `passageSummary` is a faithful summary in original words, contains no quotation marks and is
      not presented as a quotation.
- [ ] Inline references in other fields (for example `(Romeinen 12:17-21)`) are correct.
- [ ] No modern translation is reproduced.
- [ ] `context` (setting of the passage) is historically mainstream; disputed claims are marked as such.

### 2. Theology

- [ ] The big idea is a sound, broadly Christian principle, not doctrinally empty.
- [ ] Explanation is clearly interpretation and separate from what the text says.
- [ ] Grace comes first: nothing suggests that actions earn God's love or salvation.
- [ ] No claim to speak with divine authority; no promise of healing, success or wealth.
- [ ] Where Protestant, Catholic and Orthodox views differ materially, a short neutral
      `traditionNote` is present and fair to each.
- [ ] No guilt, shame, fear or pressure as a motivator.

### 3. Pastoral care and safety

- [ ] Forgiveness is never presented as accepting abuse or staying unsafe.
- [ ] Mental health, grief, trauma and addiction are treated responsibly; faith practices are never a
      replacement for professional care.
- [ ] `careNote` help lines are correct and current: huisarts; 113 Zelfmoordpreventie (113 or
      0800-0113); Veilig Thuis (0800-2000); 112 for direct danger; schuldhulpverlening via de gemeente.
- [ ] The lesson is welcoming to someone who does not (yet) believe: questions, actions and prayers
      can be tried, adapted or skipped.

### 4. Language

- [ ] Clear, warm, standard Dutch at beginner level; NBV21 book names.
- [ ] The everyday example is concrete, respectful and not stereotyped.
- [ ] No repetition of phrases or examples from other lessons.

## Recording the outcome

When a lesson passes, set its `review` in the lesson file:

```ts
review: {
  state: 'APPROVED',
  authoredBy: 'Moral Fuel editorial (AI-assisted draft)',
  authoredOn: '2026-10-17',
  reviewedBy: '<name, role>',
  reviewedOn: '<YYYY-MM-DD>',
  notes: '<what was changed, if anything>',
},
```

Changes go in the same file; raise `contentVersion` (for example `0.1.0` → `0.2.0`). The validator
(`npm test`) rejects `APPROVED` without `reviewedBy` and `reviewedOn`, checks every reference, and
recomputes the reading time from the text. Reviewed content must not be changed silently: any later
edit sets the state back to `IN_REVIEW` until it is approved again.

## Status

| Days | Theme | State |
| --- | --- | --- |
| 1–7 | Fundamenten | EDITORIAL_DRAFT |
| 8–14 | Geloof in het dagelijks leven | EDITORIAL_DRAFT |
| 15–21 | Moeilijke momenten | EDITORIAL_DRAFT |
| 22–30 | Blijvende gewoontes, terugblik, plan | EDITORIAL_DRAFT |

Points the editor flagged for extra attention: day 15 (the Greek word for worry), day 19 (the
wilderness and Deuteronomy), day 20 (Romans 5:3–4), day 21 (Paul's authority in Corinth), day 22
(the doxology of the Lord's Prayer and manuscripts), day 26 (who "the least of these" are).
