# LoveLoop Design Direction

## Three stylistic approaches

### Theme Name: Velvet Orbit
Very Brief Intro: A deep, intimate interface where plum, ink, and rose tones create a sense of a private world for two. Subtle constellation lines and orbit motifs make distance feel like a connection to navigate, not a problem to solve.
Probability: 0.07

### Theme Name: Sunlit Postcards
Very Brief Intro: A warm, editorial scrapbook aesthetic using cream paper, coral accents, and candid visual moments. It feels tactile and optimistic, like a shared travel journal designed for couples.
Probability: 0.04

### Theme Name: Soft Signal
Very Brief Intro: A calm, airy product language with misty blue, lilac, and graphite, inspired by modern messaging tools and quiet digital rituals. It makes everyday check-ins feel effortless and emotionally clear.
Probability: 0.02

## Selected approach: Velvet Orbit

### Design Movement
Contemporary romantic brutalism softened by editorial digital-product design: bold type, dark mineral surfaces, asymmetric composition, and carefully controlled gradients create a premium private-world feeling without becoming a generic dating app.

### Core Principles
1. Make distance visible through orbit lines, paired coordinates, and split compositions rather than through stock romance imagery.
2. Use dark, tactile surfaces as the quiet backdrop for warm actions and bright moments.
3. Keep emotional copy direct, specific, and lightly playful; avoid sentimental filler.
4. Make every interaction feel like a small shared ritual, with immediate feedback and a sense of progress.

### Color Philosophy
The foundation is ink-black plum (#17131f) and smoked violet (#2b2337), chosen to feel private and nocturnal. The ownable brand accent is orbit rose (#f26b8a), a warm pink that reads as energy rather than sweetness. Apricot (#ffb48d) is reserved for rewards and progress, while cream (#f8efe9) carries the most important text and keeps the dark system human.

### Layout Paradigm
Use a split-screen, editorial dashboard with a persistent left navigation rail and an asymmetrical main canvas. The primary daily challenge should occupy the visual center of gravity, while secondary modules step down in scale like a magazine spread. On mobile, collapse the rail into a bottom dock and preserve the strong hierarchy rather than compressing every card equally.

### Signature Elements
1. Orbit-ring diagrams connecting partner avatars and cities.
2. Small coordinate labels and timestamp-style metadata that make the product feel like a private signal between two places.
3. Soft grain, thin lavender rules, and rose micro-badges used as a recurring visual vocabulary.

### Interaction Philosophy
Actions should feel like sending a signal: decisive, warm, and acknowledged instantly. Buttons use compact labels and a tactile pressed state. Completing a loop should update streak and XP in place, while opening a feature that is not yet wired should show a clear, friendly toast rather than a dead end.

### Animation
Use 180–260ms ease-out transitions for navigation, buttons, cards, and drawers. Let orbit rings drift slowly only in the hero/dashboard background; keep content motion restrained. Stagger the arrival of dashboard modules by 50ms. Use small scale-and-opacity transitions for dialogs and completion states, never scale from zero. Respect reduced-motion preferences by removing nonessential float and ring movement.

### Typography System
Use Space Grotesk for display and UI headings, with Fraunces italic for emotional accents and quote-like copy. Use DM Sans for body text and supporting metadata. Headings are tight, bold, and often uppercase for labels; body copy remains sentence case with generous line-height. Avoid using one font weight across the page.

### Brand Essence
LoveLoop is the daily private playground for long-distance couples who want their relationship to feel active, playful, and close even when the map says otherwise. Personality: intimate, kinetic, thoughtful.

### Brand Voice
Headlines are confident and concise. CTAs sound like invitations into a shared moment, not software onboarding. Microcopy is observant and encouraging.

Example lines:
- “Make the miles feel smaller.”
- “Your loop is waiting on the other side.”

### Wordmark & Logo
The mark is a compact looped heart made from two offset orbital strokes, one slightly warmer and one slightly cooler, creating a shared center without using a literal heart icon as the primary logo. The wordmark uses Space Grotesk with custom-tightened tracking and a split-color “oo” loop.

### Signature Brand Color
Orbit Rose — #f26b8a.

## MVP Scope for first delivery

Build a polished responsive prototype centered on the signed-in couple dashboard. Include a compact landing-style top bar, persistent navigation, a daily challenge hero card with completion interaction, streak and Love XP progress, partner status, a date-night teaser, memory snapshots, upcoming activity list, and a message composer. Add lightweight in-app state so completion, navigation, notifications, and the composer feel live without requiring backend services. Mark non-wired features with clear “coming soon” feedback.

The primary success metric for this first delivery is that a visitor immediately understands what LoveLoop is, sees the emotional value of the daily loop, and can complete the featured challenge in one or two taps.
