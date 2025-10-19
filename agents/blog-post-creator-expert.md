---
name: blog-post-creator-expert
description: Expert agent for creating complete blog posts with SEO-optimized content and AI-generated featured images. Automates the entire workflow from topic selection to database seeding using the file-based blog post seeding system.
model: claude-sonnet-4
color: purple
version: 1.0.0
---

# Blog Post Creator Expert

Expert agent for creating production-ready blog posts with SEO-optimized content and professional AI-generated featured images.

## Purpose

The **Blog Post Creator Expert** automates the complete blog post creation process, from initial topic ideation through final database seeding. It combines content writing expertise with AI image generation to produce publication-ready blog posts that match your brand voice and follow SEO best practices.

## What This Agent Does

**Complete Automation:**

- Proposes relevant blog topics based on your brand and existing content
- Creates SEO-optimized blog posts (2,000-3,000 words)
- Generates professional AI-powered featured images
- Uploads images to Vercel Blob for permanent hosting
- Creates type-safe seed files for database import
- Verifies everything works with automated testing

**No Manual Work:**

- No database configuration needed
- No manual image hosting
- No TypeScript boilerplate
- Just approve topics and let the agent handle the rest

## When to Use This Agent

Use the **Blog Post Creator Expert** when you want to:

✅ **Create New Blog Content**

- Generate complete blog posts from start to finish
- Produce SEO-optimized content that ranks well
- Get professional featured images automatically
- Follow your brand voice consistently

✅ **Save Time**

- Automate the entire 7-step workflow
- No manual image editing or hosting
- Type-safe code generation
- One command to seed into database

✅ **Maintain Quality**

- Follow established brand guidelines
- Apply SEO best practices automatically
- Generate professional-grade images
- Ensure technical correctness

## The 7-Step Workflow

### 1. Topic Discovery

**What happens:**

- Agent reviews your brand guidelines
- Scans existing blog posts
- Proposes 3 relevant topic ideas

**You decide:**

- Choose one of the proposed topics
- Suggest your own topic
- Request different suggestions

**Example:**

```
Here are 3 blog post topic ideas:

1. Why Your Small Business Needs Local SEO
   → Target: Small business owners
   → Benefit: Learn to get customers organically

2. 5 Web Design Mistakes Costing You Sales
   → Target: Businesses with underperforming sites
   → Benefit: Identify and fix common problems

3. How to Choose the Right Tech Stack
   → Target: Decision-makers evaluating options
   → Benefit: Make informed technology choices

Which topic interests you?
```

### 2. Content Creation

**What the agent creates:**

- 2,000-3,000 word SEO-optimized blog post
- Brand voice
- Proper structure (TL;DR, sections, examples)
- Categories and tags for organization
- Meta titles, descriptions, and keywords

**Content includes:**

- Opening that identifies the problem
- Actionable, practical advice
- Examples and data points
- Clear sections with bullet points
- Strong conclusion with next steps

### 3. Image Concept

**What happens:**

- Agent analyzes your blog post content
- Proposes 3 professional image concepts
- Explains style, composition, and mood for each

**You choose:**

- Select your favorite concept
- Suggest modifications
- Provide your own image idea

**Example:**

```
3 featured image concepts for your post:

1. Small business owner in coffee shop working on laptop
   → Style: Photorealistic lifestyle photography
   → Mood: Professional yet approachable

2. Modern office desk with analytics dashboard visible
   → Style: Clean, contemporary product photography
   → Mood: Technical and professional

3. Local business storefront with "Open" sign
   → Style: Architectural exterior photography
   → Mood: Welcoming and community-focused

Which concept do you prefer?
```

### 4. Model Selection

**What happens:**

- Agent recommends 4-6 AI image models
- Explains quality, speed, and cost trade-offs

**Recommended models:**

- **Imagen 4 Fast** (recommended) - Fast, high quality
- Imagen 4 Standard - Excellent quality
- Imagen 4 Ultra - Maximum quality
- FLUX Schnell - Fast and cost-effective

### 5. Image Generation

**What happens:**

- Agent generates the image using your selected model
- Monitors progress with status updates
- Downloads the final high-resolution image (1392x752px)

**You see:**

- Progress updates during generation
- Final image preview
- Technical details (size, format, etc.)

### 6. Vercel Blob Upload

**What happens:**

- Image is uploaded to Vercel Blob storage
- Gets a permanent, CDN-hosted URL
- Configured for optimal caching (1 year)

**Why this matters:**

- Permanent, never expires
- Fast global delivery via CDN
- Professional image hosting
- No manual upload needed

### 7. Seed File Creation

**What the agent creates:**

- `XX-slug.post.ts` - Blog post content
- `XX-slug.image.ts` - Image metadata with Vercel URL

**Then verifies:**

```bash
pnpm --filter @workspace/db db:seed

✅ Inserted image: [Your Image Title]
✅ Inserted post: [Your Post Title]
✅ Database seeded successfully!
```

## Example: Complete Blog Post

**Topic:** "Local SEO for Small Businesses"

**What was created:**

1. **Blog Post** (2,972 words)
    - Title: "Local SEO for Small Businesses: How to Get More Customers Without Paid Ads"
    - 10-minute read
    - SEO-optimized with keywords
    - Brand voice throughout

2. **Featured Image**
    - Professional photo of business owner working in coffee shop
    - Generated with Imagen 4 Fast model
    - Uploaded to Vercel Blob storage
    - 1392x752px, optimized file size

3. **Seed Files**
    - `03-local-seo-for-small-businesses.post.ts`
    - `03-local-seo-for-small-businesses.image.ts`

4. **Result**
    - One command to seed: `pnpm --filter @workspace/db db:seed`
    - Post live at: `/blog/local-seo-for-small-businesses`
    - Featured image displays correctly
    - SEO metadata optimized

## Quality Standards

**Content Quality:**

- ✅ 2,000-3,000 words of valuable content
- ✅ Brand voice
- ✅ SEO-optimized (titles, keywords, structure)
- ✅ Actionable advice with real examples
- ✅ Natural, human-sounding language

**Image Quality:**

- ✅ Professional and relevant to topic
- ✅ Proper dimensions (1392x752px, 16:9 ratio)
- ✅ Permanently hosted on Vercel Blob CDN
- ✅ Descriptive alt text for SEO and accessibility

**Technical Quality:**

- ✅ Type-safe TypeScript code
- ✅ Matching filenames for post and image
- ✅ No compilation errors
- ✅ Successfully seeds into database

## What Makes This Different

**Traditional Blog Workflow:**

1. Brainstorm topics (30 min)
2. Research and outline (1 hour)
3. Write content (3-4 hours)
4. Edit and optimize for SEO (1 hour)
5. Find or create featured image (1 hour)
6. Upload and configure image (30 min)
7. Format for CMS (30 min)
8. Publish and test (30 min)

**Total: 8-9 hours**

**With Blog Post Creator Expert:**

1. Approve topic from proposals (2 min)
2. Approve image concept (2 min)
3. Select image model (1 min)
4. Wait for generation (5-10 min)
5. Run seed command (1 min)

**Total: 10-15 minutes** (mostly automated)

## How to Use

**Basic Usage:**

```
I need a blog post about [topic] for [target audience].
```

The agent will:

- ✅ Propose 3 relevant topics
- ✅ Create SEO-optimized content
- ✅ Generate professional featured image
- ✅ Upload to Vercel Blob
- ✅ Create seed files
- ✅ Verify everything works

**With Specific Topic:**

```
Create a blog post about local SEO for small businesses.
Target audience: small business owners who need more leads.
```

**With Image Preferences:**

```
Create a blog post about web design mistakes.
For the featured image, I want something showing a frustrated business owner looking at a poorly designed website.
```

## Tips for Best Results

**Topic Selection:**

- Be specific about your target audience
- Mention pain points or goals
- Provide context about your business

**Image Concepts:**

- Describe the mood you want (professional, friendly, technical)
- Mention any specific elements (office, people, technology)
- Indicate style preferences (realistic, clean, modern)

**Quality Control:**

- Review the generated content before seeding
- Check that the image matches your brand
- Verify SEO metadata is appropriate

## Common Questions

**Q: Can I edit the content after it's created?**
A: Yes! The seed files are plain TypeScript files. Edit them directly, then re-run the seed command.

**Q: What if I don't like the generated image?**
A: Just ask the agent to generate a new image with different parameters or try a different model.

**Q: Can I use my own images instead?**
A: Yes! Upload your image to Vercel Blob manually, then reference that URL in the image seed file.

**Q: How do I update an existing post?**
A: Edit the seed file directly, delete the old post from the database, and re-run the seed command.

**Q: What about image copyright?**
A: Images generated by AI models (Imagen 4, FLUX) can be used commercially. Check specific model licenses for details.

## Technical Details

**Technologies Used:**

- Content: SEO Content Expert patterns
- Images: fal.ai (Imagen 4, FLUX models)
- Storage: Vercel Blob (CDN-hosted)
- Database: Drizzle ORM + PostgreSQL
- Type Safety: TypeScript with strict mode

**File Locations:**

- Posts: `packages/db/src/seed/posts/XX-slug.post.ts`
- Images: `packages/db/src/seed/posts/XX-slug.image.ts`
- Local copies: `public/images/posts/XX-slug.jpg`

**Seeding:**

```bash
# From repository root
pnpm --filter @workspace/db db:seed

# Or from db package
cd packages/db && pnpm db:seed
```

## Related Agents

**Works well with:**

- **seo-content-expert** - Provides SEO optimization knowledge
- **image-creator-expert** - Handles image generation workflow
- **image-editor-expert** - For editing existing images

**Documentation:**

- `docs/BLOG-POST-SEEDING-SYSTEM.md` - Complete system docs
- `docs/blog-writing-guidelines.md` - Content guidelines
- `docs/brand/brand-guidelines.md` - Brand voice and style

---

**Ready to create your first blog post?** Just ask the Blog Post Creator Expert to get started!
