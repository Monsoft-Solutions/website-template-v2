# Keel Blog Writing Guidelines

**Version:** 1.0  
**Last Updated:** October 19, 2025  
**For:** Content creators, developers, and contributors

---

## Overview

This guide establishes content standards for the Keel blog. All blog posts must align with Keel's brand philosophy: **"Less is more. Keel removes complexity, not capability."**

Blog content serves three purposes:

1. **Educate** developers and business owners on modern web development
2. **Demonstrate** expertise and build authority
3. **Drive** organic traffic through SEO-optimized content

---

## Voice & Tone

### Core Principles

**Clear over clever**

- Direct statements, not metaphors
- Active voice preferred
- Short, scannable sentences
- Technical content made accessible

**Technical but accessible**

- Assume developer audience baseline
- Explain complex concepts simply
- Use code examples to demonstrate
- Avoid jargon unless necessary

**Confident, not arrogant**

- "Here's how we solved this" not "The only way to do this"
- Share learnings, not lectures
- Show results, don't just tell

### Keel Blog Voice

Write as if you're pair programming with a colleague:

- Conversational but professional
- Technical depth encouraged
- Practical over theoretical
- Solution-focused

### What We Say

✅ **Use these patterns:**

- "Here's how..."
- "We built this by..."
- "The solution..."
- "This approach works because..."
- "In production, we found..."

✅ **Approved terminology:**

- Production-ready
- Type-safe
- Built with [specific tech]
- Hours, not weeks (when relevant)
- Real-world example

### What We Don't Say

❌ **Avoid these patterns:**

- "Revolutionary approach"
- "Game-changing solution"
- "Blazing fast"
- "World-class"
- "Cutting-edge technology"
- "Seamlessly integrate"
- "Unlock the power"

❌ **Corporate jargon:**

- Leverage
- Synergy
- Paradigm shift
- Transform your workflow
- Empower developers

---

## Blog Post Structure

### Required Elements

Every blog post must include:

**1. Title (H1)**

- 50-60 characters
- Primary keyword near the beginning
- Clear, descriptive (not clickbait)
- Promise specific value

Example:

- ✅ "Setting Up Drizzle ORM with PostgreSQL in Next.js 15"
- ❌ "The Ultimate Database Setup Guide You Need Right Now"

**2. TL;DR Section**

- First section after title
- 2-3 bullet points
- Key takeaways summarized
- Helps readers decide if post is relevant

Example:

```markdown
**TL;DR**

- Drizzle ORM provides type-safe database access in Next.js
- Setup takes ~15 minutes with TypeScript autocomplete
- Migration workflow beats Prisma for production deployments
```

**3. Introduction (First 100 words)**

- State the problem clearly
- Mention primary keyword naturally
- Preview the solution
- Set expectations (reading time, skill level)

**4. Body Content**

- Break into logical H2 sections
- Use H3 subheadings for detail
- Include code examples
- Add images/diagrams where helpful
- Link to related documentation

**5. Code Examples**

- Always tested and functional
- Include language label for syntax highlighting
- Add comments for clarity (but don't over-explain)
- Show real-world code, not toy examples

**6. Conclusion**

- Summarize key points
- Provide next steps
- Link to related resources

**7. Call-to-Action**

- One clear CTA at the end
- Non-pushy, value-focused
- Examples: "Try Keel", "Read the docs", "See more guides"

### Post Structure Template

````markdown
# [Descriptive Title with Keyword]

**TL;DR**

- Key point one
- Key point two
- Key point three

## Introduction

[Problem statement. Why this matters. What you'll learn.]

## Section 1: [First Main Point]

[Content with examples]

### Subsection if needed

[Detailed explanation]

## Section 2: [Second Main Point]

[Content with examples]

## Section 3: [Implementation]

[Step-by-step guide with code]

```typescript
// Code example
```
````

## Conclusion

[Summary and next steps]

**Want to build faster?** [Clear CTA linking to relevant page]

```

---

## SEO Best Practices

### Keyword Strategy

**Primary Keyword:**
- One focus keyword per post
- Include in: title, first paragraph, conclusion
- Use naturally, never force
- Density: 0.5-2% (approximately)

**Secondary Keywords:**
- 2-3 related terms
- Variations of primary keyword
- Natural language alternatives

**Long-tail Keywords:**
- Specific phrases users search for
- Question-based (How to, Why, What is)
- Include in subheadings

### On-Page SEO Checklist

For every blog post:

- [ ] Primary keyword in title (H1)
- [ ] Keyword in first 100 words
- [ ] Keyword in at least one H2 heading
- [ ] Meta description (150-160 chars) with keyword
- [ ] Featured image with descriptive alt text
- [ ] URL slug matches topic (kebab-case)
- [ ] Internal links to 2-3 related pages/posts
- [ ] External links to authority sources (when relevant)
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipping)

### Meta Description Formula

```

[Action verb] + [primary keyword] + [specific benefit] + [proof/result]

````

Examples:
- "Learn how to set up Drizzle ORM in Next.js 15. Type-safe queries in 15 minutes. Includes production config."
- "Compare Drizzle vs Prisma for production apps. Real benchmarks, migration guide, and why we switched."

### Internal Linking Strategy

**Link to:**
- Related blog posts (2-3 per post)
- Relevant documentation pages
- Service pages (when naturally relevant)
- Homepage or about page (sparingly)

**Anchor text best practices:**
- Use descriptive phrases, not "click here"
- Include keywords naturally
- Make link purpose clear from context

---

## Content Quality Standards

### Minimum Requirements

**Length:**
- Tutorial/Guide: 1,000-2,000 words
- How-to: 800-1,500 words
- Announcement: 400-800 words
- Case Study: 600-1,000 words

**Readability:**
- Target: Grade 10 reading level or below (technical content may be higher)
- Average sentence length: 15-20 words
- Mix short and long sentences for rhythm
- Use bullet points and lists for scannability

**Code Quality:**
- All code examples tested and functional
- Include package versions when relevant
- Show imports and dependencies
- Comment complex logic
- Follow TypeScript best practices

**Visual Content:**
- At least one featured image per post
- Screenshots for UI/configuration steps
- Code screenshots only when syntax highlighting unavailable
- All images optimized (WebP format, compressed)
- Descriptive alt text for every image

### Quality Checklist

Before publishing:

- [ ] Reads naturally when spoken aloud
- [ ] Provides unique value (not generic advice)
- [ ] Solves a specific problem
- [ ] Code examples tested and working
- [ ] All links functional
- [ ] No grammatical errors (Grammarly/LanguageTool)
- [ ] Passes AI detection (< 30% AI probability)
- [ ] Follows Keel brand voice
- [ ] SEO optimized without keyword stuffing
- [ ] Mobile-friendly formatting

---

## Post Type Templates

### 1. Tutorial Post

**Purpose:** Teach a specific skill or implementation
**Length:** 1,000-2,000 words
**Structure:**

```markdown
# How to [Specific Task] with [Technology]

**TL;DR**
- What you'll build
- What you'll learn
- Time required

## What You'll Need
- Prerequisites
- Tools/packages

## Step 1: [First Step]
[Explanation + code]

## Step 2: [Second Step]
[Explanation + code]

## Testing It
[Verification steps]

## Common Issues
[Troubleshooting]

## Next Steps
[What to learn next]

## Conclusion
[Summary + CTA]
````

**Example Topics:**

- "How to Set Up Drizzle Migrations in Next.js 15"
- "Building a Type-Safe API with Next.js Server Actions"
- "Implementing Dark Mode with next-themes and Tailwind CSS v4"

---

### 2. Announcement Post

**Purpose:** Share product updates, new features, or news  
**Length:** 400-800 words  
**Structure:**

```markdown
# [New Feature/Update Name]

**TL;DR**

- What's new
- Why it matters
- How to use it

## What's New

[Description of update]

## Why We Built This

[Problem it solves]

## How It Works

[Brief explanation with code example]

## Getting Started

[Quick start steps]

## What's Next

[Future plans]
```

**Example Topics:**

- "Keel Now Includes Built-in Blog System"
- "Next.js 15 and React 19 Support"
- "New Authentication Flow with Better DX"

---

### 3. How-To Guide

**Purpose:** Solve a specific problem  
**Length:** 800-1,500 words  
**Structure:**

```markdown
# How to [Solve Specific Problem]

**TL;DR**

- The problem
- The solution
- Expected outcome

## The Problem

[Detailed problem description]

## The Solution

[Step-by-step solution]

## Implementation

[Code examples]

## Alternative Approaches

[Other options considered]

## Conclusion

[Summary + when to use this approach]
```

**Example Topics:**

- "How to Debug TypeScript Type Errors in Drizzle Queries"
- "Optimizing Next.js Image Loading for Large Galleries"
- "Setting Up PostgreSQL Connection Pooling for Production"

---

### 4. Case Study

**Purpose:** Share real project experience  
**Length:** 600-1,000 words  
**Structure:**

```markdown
# [Project Name]: [Key Result]

**TL;DR**

- The project
- The challenge
- The outcome

## The Project

[Client/project context]

## The Challenge

[Specific problems faced]

## Our Approach

[How Keel/strategy helped]

## The Results

[Quantifiable outcomes]

## Key Learnings

[What we learned]

## Takeaways

[Lessons for readers]
```

**Example Topics:**

- "Building an E-commerce Site in 3 Days with Keel"
- "Migrating from WordPress to Next.js: A Client Story"
- "How We Cut Development Time by 60% Using Type-Safe APIs"

---

### 5. Technical Comparison

**Purpose:** Help readers make informed technology decisions  
**Length:** 1,000-1,800 words  
**Structure:**

```markdown
# [Technology A] vs [Technology B]: [Use Case]

**TL;DR**

- Key differences
- When to use each
- Our recommendation

## Overview

[Brief intro to both technologies]

## Feature Comparison

[Side-by-side comparison]

## Performance

[Benchmarks if available]

## Developer Experience

[DX considerations]

## Production Considerations

[Deployment, maintenance, scaling]

## Our Choice

[Why we chose one, with reasoning]

## Conclusion

[Recommendation based on use case]
```

**Example Topics:**

- "Drizzle vs Prisma for Production Next.js Apps"
- "Turborepo vs Nx: Choosing a Monorepo Tool"
- "Server Components vs Client Components: When to Use Each"

---

## Writing Process

### Before You Write

**1. Research the topic**

- Verify technical accuracy
- Check latest documentation
- Review competitor content (to differentiate)
- Identify content gaps

**2. Define keyword strategy**

- Primary keyword (high search volume)
- Secondary keywords (2-3 related terms)
- Long-tail variations (questions)

**3. Outline the post**

- Main sections (H2)
- Key points per section
- Code examples needed
- Visual assets required

### While Writing

**1. First draft focus**

- Get ideas down
- Don't self-edit yet
- Include all code examples
- Note where images needed

**2. Natural keyword integration**

- Use primary keyword in title, intro, conclusion
- Include secondary keywords in headings
- Use long-tail keywords in body
- Never force keywords awkwardly

**3. Code example checklist**

- Tested and working
- Includes necessary imports
- Shows TypeScript types
- Comments explain non-obvious parts
- Follows project conventions

### After Writing

**1. Edit for clarity**

- Remove unnecessary words
- Shorten complex sentences
- Replace jargon with simpler terms
- Improve flow between sections

**2. Edit for brand voice**

- Remove AI-detected patterns
- Replace corporate jargon
- Use active voice
- Ensure confident but humble tone

**3. SEO optimization**

- Add internal links
- Write meta description
- Optimize images and alt text
- Check keyword placement

**4. Final review**

- Read aloud (catches awkward phrasing)
- Run through quality checklist
- Test all code examples
- Verify all links work

---

## Technical Writing Best Practices

### Code Examples

**Do:**

```typescript
// ✅ Good: Shows context, types, and imports
import { db } from '@workspace/db/client'
import { users } from '@workspace/db/schema'

// Get all users with proper type inference
const allUsers = await db.select().from(users)
// allUsers: User[]
```

**Don't:**

```typescript
// ❌ Bad: No context, unclear types
const data = await getData()
```

### Technical Explanations

**Do:**

- Start with the "why" before the "how"
- Use analogies sparingly (only if genuinely helpful)
- Break complex concepts into steps
- Provide context before diving deep

**Don't:**

- Assume too much prior knowledge
- Use overly academic language
- Skip explaining key concepts
- Leave readers guessing next steps

### Code Comments

**Do:**

```typescript
// Validate environment variables at build time
export const env = createEnv({
    server: {
        POSTGRES_URL: z.string().url(),
    },
    runtimeEnv: process.env,
})
```

**Don't:**

```typescript
// This is a function that gets the user
function getUser() { ... }
// ^ Comment adds no value
```

---

## Image Guidelines

### Featured Images

**Requirements:**

- Minimum size: 1200x630px (Open Graph)
- Format: WebP (JPG fallback)
- File size: < 200KB after compression
- Aspect ratio: 16:9 or 2:1

**Alt text formula:**

```
[Content type] showing [main element] with [relevant keyword]
```

Examples:

- "Code screenshot showing Drizzle ORM schema definition in TypeScript"
- "Diagram illustrating Next.js 15 server component data flow"

### Screenshots

**Best practices:**

- Use high-resolution (retina)
- Crop to relevant area only
- Annotate with arrows/highlights if needed
- Use consistent theme (light/dark mode)
- Include browser chrome only if relevant

### Diagrams

**When to use:**

- Architecture overviews
- Data flow illustrations
- Process workflows
- Comparison charts

**Tools:**

- Excalidraw (recommended)
- Lucidchart
- Figma
- Mermaid diagrams (code-based)

---

## Publishing Checklist

### Pre-Publish

**Content:**

- [ ] Title follows formula (50-60 chars)
- [ ] TL;DR section included
- [ ] Primary keyword in first 100 words
- [ ] All code examples tested
- [ ] Proper heading hierarchy (H1→H2→H3)
- [ ] Internal links added (2-3)
- [ ] External links to authority sources
- [ ] Clear CTA at end

**Technical:**

- [ ] Meta description (150-160 chars)
- [ ] Featured image uploaded
- [ ] Image alt text descriptive
- [ ] URL slug optimized
- [ ] Category assigned
- [ ] Tags added (3-5)
- [ ] Author set
- [ ] Publish date scheduled

**Quality:**

- [ ] Grammar checked (Grammarly)
- [ ] Readability score acceptable
- [ ] AI detection < 30%
- [ ] Brand voice consistent
- [ ] Mobile preview reviewed
- [ ] All links tested

### Post-Publish

**Immediate:**

- [ ] Preview published post
- [ ] Test social sharing (OG tags)
- [ ] Verify images loading
- [ ] Check mobile formatting
- [ ] Test all links again

**Week 1:**

- [ ] Monitor search console for indexing
- [ ] Check initial engagement metrics
- [ ] Fix any reported issues
- [ ] Share on social media
- [ ] Add to newsletter (if applicable)

**Month 1:**

- [ ] Review analytics (traffic, engagement)
- [ ] Check keyword rankings
- [ ] Update content if needed
- [ ] Add internal links from new posts

---

## Common Mistakes to Avoid

### Content Mistakes

❌ **Over-explaining basics**

- Keel audience = developers
- Don't explain what React is
- Link to external resources for fundamentals

❌ **Keyword stuffing**

- Natural integration only
- If it feels forced, rewrite
- Semantic variations preferred

❌ **Generic advice**

- "Follow best practices" (too vague)
- "Use modern tools" (not specific)
- Provide actionable, specific guidance

❌ **Clickbait titles**

- "You Won't Believe This Next.js Trick"
- "The Ultimate Guide to Everything"
- Be descriptive and accurate

### Technical Mistakes

❌ **Untested code examples**

- Always run code before publishing
- Include package versions
- Test in fresh environment

❌ **Outdated information**

- Check documentation dates
- Verify package versions
- Note deprecation warnings

❌ **Missing error handling**

```typescript
// ❌ Bad
const data = await fetch('/api/users')

// ✅ Good
try {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
} catch (error) {
    console.error('Error fetching users:', error)
}
```

### SEO Mistakes

❌ **Thin content**

- < 500 words rarely ranks
- Provide depth and value
- Quality over quantity

❌ **Broken internal links**

- Verify links before publishing
- Update links when URLs change
- Regular link audits

❌ **Missing meta descriptions**

- Write custom descriptions
- Never leave auto-generated
- Include primary keyword

---

## Style Reference

### Formatting

**Headings:**

```markdown
# H1: Post Title (Only one per post)

## H2: Main Sections

### H3: Subsections
```

**Lists:**

```markdown
**Unordered:**

- Item one
- Item two
- Item three

**Ordered:**

1. First step
2. Second step
3. Third step
```

**Code blocks:**

````markdown
```typescript
// Always include language for syntax highlighting
const example = 'code here'
```
````

**Emphasis:**

```markdown
**Bold** for important terms
_Italic_ for emphasis (use sparingly)
`Code` for inline code, variables, file names
```

### Tone Examples

**✅ Good (Keel voice):**

- "Here's how we set up Drizzle in production."
- "This approach saves ~2 hours of configuration."
- "The migration ran in 45 seconds on our staging database."
- "We tested this with 10,000 users."

**❌ Bad (Not Keel voice):**

- "This revolutionary approach will transform your workflow."
- "Seamlessly integrate world-class solutions."
- "Unlock the full potential of modern development."
- "You'll be amazed by what this can do."

---

## Resources

### Internal

- **Keel Brand Guidelines:** `/docs/brand/brand-guidelines.md`
- **SEO Best Practices:** `.cursor/rules/seo-content-expert.mdc`
- **TypeScript Standards:** `.cursor/rules/typescript.mdc`
- **Site Config:** `apps/web/lib/data/site-config.ts`

### External Tools

**Writing:**

- Grammarly (grammar checking)
- Hemingway Editor (readability)
- LanguageTool (style checking)

**SEO:**

- Ahrefs (keyword research)
- SEMrush (competitor analysis)
- Google Search Console (performance)
- Screaming Frog (technical SEO)

**Images:**

- TinyPNG (compression)
- Squoosh (WebP conversion)
- Excalidraw (diagrams)
- Carbon (code screenshots)

**Testing:**

- GPTZero (AI detection)
- Copyscape (plagiarism check)
- PageSpeed Insights (performance)

---

## Version History

**1.0** (October 19, 2025)

- Initial release
- Aligned with Keel Brand Guidelines
- SEO best practices integrated
- Blog post templates included

---

## Questions?

For questions about blog content guidelines:

- Review Keel Brand Guidelines (`/docs/brand/brand-guidelines.md`)
- Check SEO Content Expert rules (`.cursor/rules/seo-content-expert.mdc`)
- Contact the content team

---

**Remember:** Great blog content educates, demonstrates expertise, and drives organic traffic—all while maintaining Keel's clear, direct brand voice. Write for developers who value substance over style.
