# Vietnam Biofuel Resource Guide — Design Direction

## Three exploratory directions

### Theme Name: Field Atlas / Chosen
**Very Brief Intro:** An editorial, data-rich field guide that feels like a contemporary research atlas: tactile, place-aware, and built for policy and investment conversations. It uses deep indigo ink, rice-straw gold, and mineral greens to turn dense evidence into an approachable journey through Vietnam’s feedstock landscape.

**Probability:** 0.07

### Theme Name: Rice Paper Ledger
**Very Brief Intro:** A quiet, highly typographic policy brief inspired by Vietnamese paper craft, with subtle ruled grids and vermilion annotations. It foregrounds citations and credibility through a slower, document-like experience.

**Probability:** 0.04

### Theme Name: Delta Signal
**Very Brief Intro:** A high-contrast operational dashboard for resource flows, using dark water, bright mapping signals, and compact technical panels. It frames biofuels as a system-monitoring challenge rather than an editorial resource.

**Probability:** 0.09

---

## Chosen approach: Field Atlas

### Design Movement
**Contemporary editorial cartography** with the disciplined information density of a field journal and the material warmth of a printed agricultural atlas. The experience should feel researched rather than corporate, and regional rather than generic.

### Core Principles
1. **Evidence should feel navigable.** Dense analysis is translated into progressive disclosure, filters, tooltips, and well-labeled visual hierarchies rather than long uninterrupted text blocks.
2. **Materials convey subject matter.** Warm fibre textures, crop-toned surfaces, fine map-line motifs, and mineral ink make the site feel rooted in agricultural landscapes without using decorative clichés.
3. **Every visual has a job.** A single low-key photographic hero frames the national context; charts, data bars, and pathway badges are deterministic interface elements, never decorative filler.
4. **Regionality beats abstraction.** The layout should reveal the links between feedstocks, geographical clusters, conversion pathways, safeguards, and market context.

### Color Philosophy
The base is **deep indigo ink** to establish editorial rigor and high contrast. Parchment and misted rice-paper neutrals create breathing room for evidence. **Rice-straw gold** is the distinctive highlight color, signaling agricultural opportunity without the usual neon green cliché. Forest, clay, and husk-brown colors encode specific resource categories and should be used sparingly as semantic signals rather than as decoration.

### Layout Paradigm
The page behaves like a **scrolling field folio**, not a centered landing-page stack. A persistent left rail becomes the route index on larger screens; the main reading field alternates between an asymmetric story column and full-bleed data bands. The hero is a split composition with a quiet research introduction on the left and an imagery-led regional visual on the right. Subsequent sections use offset notes, tabbed evidence cards, and horizontal rail panels to create the sensation of turning through an atlas.

### Signature Elements
1. **Atlas index rail:** A numbered vertical navigation rail with active section marker and provenance note.
2. **Crop stamps:** Compact, illustrated category marks with a crop-color band and pathway label used across cards and tables.
3. **Field-rule annotations:** Hairline grid lines, small uppercase evidence labels, and pull-quote capsules that resemble marginalia in a research folio.

### Interaction Philosophy
Interactions should reward inquiry, not distract. Feedstock cards filter by pathway and priority; expandable resource notes reveal assumptions; indicator chips respond instantly; navigation smooth-scrolls and indicates position. Interactions are direct, readable, and never hide essential evidence behind novelty.

### Animation
On first entry, content surfaces in short 180–260 ms opacity and translate transitions with a staggered cadence. Data bars grow once when entering the viewport; tabs and filters crossfade their panel content. Hover states use a 160 ms lift and shadow shift. A `prefers-reduced-motion` rule disables nonessential movement. No looping animations or ambient parallax are used.

### Typography System
**DM Serif Display** creates the editorial voice for major headings, numerals, pull quotes, and select feedstock names. **Manrope** handles labels, navigation, body text, data tables, and controls at high legibility. Headings use deliberate scale contrast; labels are small, uppercase, tracked, and colored in muted indigo. Avoid Inter and generic dashboard typography.

### Brand Essence
**Vietnam Biofuel Atlas turns agricultural-resource evidence into a shared decision tool for policymakers, investors, researchers, and rural value-chain leaders.**

Personality: **grounded, rigorous, forward-looking**.

### Brand Voice
Headlines are precise, active, and slightly editorial. CTAs invite examination rather than overpromise. Microcopy names the evidence type or uncertainty plainly.

Example lines:

> Map what is abundant. Prioritize what is deliverable.

> Start with residues; scale only where the system can hold.

### Wordmark & Logo
The mark is a **segmented rice-grain / river-delta loop**: three tapering golden field bands encircle an indigo center, suggesting biomass circulation, a grain kernel, and the Mekong’s branching water paths. It contains no text so it can serve as the site icon and favicon. The wordmark uses DM Serif Display with a narrow Manrope descriptor underneath.

### Signature Brand Color
**Rice-straw gold — `#E3A72F`**. This is reserved for active states, data emphasis, and the mark’s field bands.

## Style Decisions

- Hero imagery must be **low-key and atmospheric**, so all overlay typography uses parchment/light text on a dark indigo-to-forest treatment.
- Resource numbers are visually prominent but always accompanied by a qualification label such as “gross theoretical” or “illustrative sustainable screen.”
- Feedstock colors are semantic: rice = gold, bagasse = cane green, cassava = clay, manure/biogas = deep green, regional residues = husk brown.
- Rounded corners are restrained: modest 6–14 px radii, except for cropped circular crop stamps and pill-sized metadata tags.
- Every opening surface must show the segmented rice-grain / river-delta mark with the Vietnam Biofuel Atlas wordmark or descriptor; the identity is never deferred to the footer.
- On larger screens, the left gutter functions as an atlas index rail; on the document canvas, matching visible marginalia and section-location cues preserve that function in a long-read view.
- Every major section carries a Vietnam-specific field cue: the Mekong Delta rice landscape, mill and processing geography, clustered livestock systems, or national blending routes.
