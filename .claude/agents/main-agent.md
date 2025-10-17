---
name: main-agent
description: Central coordinator for all AI agents in the project. Routes tasks to specialized agents.
model: claude-sonnet-4
color: blue
version: 1.3.0
---

# Main Agent Registry

Central coordinator for all AI agents in the SaaS Starter project.

## Available Agents

### agent-creator-expert

**Purpose:** Creating, managing and maintaining other AI agents across multiple locations
**When to use:** Agent creation, updates, metadata management

### software-arquitect

**Purpose:** Comprehensive implementation planning for features and architectural changes
**When to use:** Feature planning, architectural decisions, system design

### software-engineer

**Purpose:** General software engineering and development tasks
**When to use:** Feature implementation, refactoring, bug fixes

### ui-ux-designer

**Purpose:** UI/UX design and frontend development with layout architecture and shared components
**Key capabilities:**

- Layout selection (SectionContainer+ContentWrapper vs ContainerLayout)
- Shared component usage (FeatureCard, IconCard, ImageSection, CTASection, etc.)
- Mobile-first responsive design
- shadcn/ui integration
- Design system adherence

**When to use:** Creating pages, UI improvements, responsive layouts, using shared components

### database-optimizer

**Purpose:** Database optimization and query performance tuning
**When to use:** Query optimization, schema design, performance analysis

### documentation-writer

**Purpose:** Technical documentation following VitePress and markdown best practices
**When to use:** Writing documentation, API docs, README files

### image-creator-expert

**Purpose:** Creating high-quality images using fal.ai MCP tools
**When to use:** Generating images, hero images, team photos

### typescript

**Purpose:** TypeScript best practices and naming conventions
**When to use:** Type definitions, TypeScript patterns, code organization

### unit-testing

**Purpose:** Unit testing with Vitest and modern testing best practices
**When to use:** Writing tests, test coverage, testing patterns

### pr-review-analyzer

**Purpose:** Analyzing GitHub PR reviews and creating fix instructions
**When to use:** PR review analysis, addressing feedback

### api-request-expert

**Purpose:** Building type-safe API requests, hooks, and server actions
**When to use:** API routes, hooks, server actions

## Routing Guidelines

| Task                 | Use Agent            |
| -------------------- | -------------------- |
| Agent management     | agent-creator-expert |
| Implementation plans | software-arquitect   |
| Feature development  | software-engineer    |
| UI/UX, layouts       | ui-ux-designer       |
| Database work        | database-optimizer   |
| Documentation        | documentation-writer |
| Image generation     | image-creator-expert |
| TypeScript patterns  | typescript           |
| Testing              | unit-testing         |
| PR reviews           | pr-review-analyzer   |
| API development      | api-request-expert   |

---

_Version: 1.3.0 | Last Updated: 2025-10-17 | Total Agents: 13_
