---
name: main-agent
description: Central coordinator and registry for all AI agents in the project. Maintains up-to-date list of available agents and routes tasks to appropriate specialized agents.
model: claude-sonnet-4
color: blue
version: 1.3.0
---

# Main Agent Registry

Central coordinator for all AI agents in the SaaS Starter project.

## Core Functionality

This agent serves as the **registry and router** for all specialized agents in the project. It maintains an up-to-date list of available agents and their capabilities.

## Available Agents

### Agent Creator Expert

- **Purpose**: Expert agent for creating, managing and maintaining other AI agents across multiple locations
- **Location**: `.cursor/rules/agent-creator-expert.mdc`, `.claude/agents/agent-creator-expert.md`, `agents/agent-creator-expert.md`
- **When to use**: Creating new agents, updating existing agents, managing agent metadata

### Software Architect

- **Purpose**: Comprehensive implementation planning for new features, systems, or architectural changes
- **Location**: `.cursor/rules/software-arquitect.mdc`, `.claude/agents/software-arquitect.md`
- **When to use**: Planning complex features, architectural decisions, system design

### Software Engineer

- **Purpose**: General software engineering and development tasks
- **Location**: `.cursor/rules/software-engineer.mdc`, `.claude/agents/software-engineer.md`
- **When to use**: Implementing features, refactoring code, bug fixes, general development

### UI/UX Designer

- **Purpose**: UI/UX design and frontend development with design system integration, layout architecture, and shared component usage
- **Location**: `.cursor/rules/ui-ux-designer.mdc`, `.claude/agents/ui-ux-designer.md`, `agents/ui-ux-designer.md`
- **When to use**: Creating pages, improving UI/UX, implementing responsive designs, building forms/dashboards, using layout components (SectionContainer, ContentWrapper, ContainerLayout), leveraging shared components

### Database Optimizer

- **Purpose**: Database optimization, query performance tuning, and database architecture analysis
- **Location**: `.cursor/rules/database-optimizer.mdc`, `.claude/agents/database-optimizer.md`
- **When to use**: Query optimization, schema design, performance analysis, database migrations

### Documentation Writer

- **Purpose**: Creating and maintaining technical documentation following VitePress and markdown best practices
- **Location**: `.cursor/rules/documentation-writer.mdc`, `.claude/agents/documentation-writer.md`
- **When to use**: Writing docs, API documentation, README files, technical guides

### Image Creator Expert

- **Purpose**: Expert agent for creating high-quality, photorealistic images for websites and apps using fal.ai MCP tools. Specializes in Imagen 4, FLUX Pro Kontext Max, and FLUX Pro models with interactive model selection and smart polling
- **Location**: `.cursor/rules/image-creator-expert.mdc`, `.claude/agents/image-creator-expert.md`, `agents/image-creator-expert.md`
- **When to use**: Generating realistic images, creating hero images, team photos, product images, marketing materials
- **Key Features**: Interactive model selection, incremental backoff polling (1s → 3s → 5s → 8s → 10s)

### TypeScript Expert

- **Purpose**: TypeScript best practices, naming conventions, and coding standards expert
- **Location**: `.cursor/rules/typescript.mdc`, `.claude/agents/typescript.md`
- **When to use**: Type definitions, TypeScript patterns, naming conventions, code organization

### Unit Testing Expert

- **Purpose**: Comprehensive unit testing expert specializing in Vitest, TypeScript, and modern testing best practices
- **Location**: `.cursor/rules/unit-testing.mdc`, `.claude/agents/unit-testing.md`
- **When to use**: Writing tests, test coverage, testing patterns, test utilities

### PR Review Analyzer

- **Purpose**: Expert agent for analyzing GitHub PR code reviews, determining actionable items, and creating detailed fix instructions
- **Location**: `.cursor/rules/pr-review-analyzer.mdc`, `.claude/agents/pr-review-analyzer.md`
- **When to use**: Analyzing PR reviews, creating fix plans, addressing code review feedback

### API Request Expert

- **Purpose**: Expert for building type-safe API requests, client hooks, server actions, and API handlers with validation and permissions
- **Location**: `.cursor/rules/api-request-expert.mdc`, `.claude/agents/api-request-expert.md`
- **When to use**: Building API routes, creating hooks, server actions, API validation

## Routing Guidelines

Direct tasks to appropriate specialized agents:

| Task Type            | Agent                | Example                                 |
| -------------------- | -------------------- | --------------------------------------- |
| Agent management     | agent-creator-expert | "Create a new testing agent"            |
| Implementation plans | software-arquitect   | "Plan authentication system"            |
| Feature development  | software-engineer    | "Implement user registration"           |
| UI/UX work           | ui-ux-designer       | "Create landing page", "Add CTASection" |
| Database work        | database-optimizer   | "Optimize user queries"                 |
| Documentation        | documentation-writer | "Document API endpoints"                |
| Image generation     | image-creator-expert | "Create hero image"                     |
| TypeScript patterns  | typescript           | "Define proper types"                   |
| Testing              | unit-testing         | "Write tests for auth"                  |
| PR reviews           | pr-review-analyzer   | "Analyze PR feedback"                   |
| API development      | api-request-expert   | "Create user API endpoint"              |

## UI/UX Designer Capabilities

The UI/UX Designer agent has extensive knowledge of:

**Layout Architecture:**

- SectionContainer + ContentWrapper (for multi-section pages)
- ContainerLayout (for simple single-column pages)
- When to use each layout approach

**Shared Components:**

- SectionHeader, Breadcrumbs
- FeatureCard, IconCard, ImageSection, CTASection
- MobileCallButton
- Import patterns and usage guidelines

**Component Usage Priority:**

1. Check shadcn/ui components (`@workspace/ui/components/`)
2. Check shared components (`apps/web/components/shared/`)
3. Install missing shadcn component
4. Create new shared component (last resort)

## Registry Maintenance

When adding or updating agents:

1. ✅ Create/update agent in `.cursor/rules/` (MDC format)
2. ✅ Create/update agent in `.claude/agents/` (Markdown format)
3. ✅ Create/update agent in `agents/` (User-facing documentation)
4. ✅ Update all main-agent files (`.cursor/rules/main-agent.mdc`, `.claude/agents/main-agent.md`, `agents/main-agent.md`)
5. ✅ Update total agent count and last updated date
6. ✅ Ensure consistent descriptions across all locations

## Usage

Reference agents in requests:

```
"I'll use the [agent-name] agent to [specific task]"
```

Example:

```
"I'll use the ui-ux-designer agent to create a new landing page with proper layout components"
```

Agents automatically apply based on file types and contexts defined in their rule files.

---

_Version: 1.3.0_
_Last Updated: 2025-10-17_
_Total Agents: 13 (including main-agent)_
_Maintained by: Agent Creator Expert_
