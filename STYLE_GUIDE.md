# Global Governance Framework Documentation Style Guide

## Purpose and Scope

This style guide establishes consistent standards for all Global Governance Framework documentation. It aims to:

- Ensure coherent presentation across all frameworks
- Improve readability and accessibility
- Facilitate multilingual translation
- Support efficient content development and maintenance
- Enable users to navigate seamlessly between frameworks

These guidelines apply to all new content creation and should be gradually implemented when updating existing documentation.

## Document Structure

### 1. Framework Organization

- **Framework Index**: Each framework must include an `index.md` file providing an overview, section links, and navigation guidance
- **Section Files**: Individual sections stored as separate markdown files following consistent naming patterns
- **Tools Directory**: Implementation tools stored in a `/tools/` subdirectory
- **Seed Kit**: Core implementation resources grouped in a `/seed-kit/` subdirectory

### 2. Section Hierarchy and Numbering

Every framework must follow a consistent section hierarchy:

1. **Preamble/Introduction**: Vision, purpose, and context
2. **Core Principles**: Foundational values and frameworks
3. **Structural Components**: Key systems and mechanisms
4. **Implementation Approaches**: Practical deployment strategies
5. **Metrics and Evaluation**: Assessment frameworks
6. **Supporting Sections**: Specific to framework needs
7. **Appendices**: Supplementary details

Numbering should follow these patterns:
- **Major sections**: Use sequential numbers (e.g., `01-introduction.md`, `02-core-principles.md`)
- **Subsections**: For document organization, use decimal notation (e.g., 2.1, 2.2)

### 3. Standard Section Components

Every section should include these elements:

```markdown
---
title: Section Title
section: section-id
---

# Section Title

**In this section:**
- [Subsection One](#subsection-one)
- [Subsection Two](#subsection-two)
- [Subsection Three](#subsection-three)

**Estimated Reading Time**: X minutes

Brief introduction paragraph that summarizes the section's purpose and content.

## <a id="subsection-one"></a>Subsection One

Content goes here...
```

### 3. Case Studies and Examples

Format all case studies consistently:

```markdown
**Case Study [Type]**: [Title]

[Region/Organization], [Year Range] implemented [approach] addressing [challenge]. Key outcomes included [measurable results]. This example demonstrates [principle/lesson relevant to framework].

**Example [Type]**: In Rwanda's post-genocide MHPSS initiatives, community-based sociotherapy facilitated collective healing for over 120,000 participants, processing 1.9 million cases while improving mental health and conflict management capacities.
```

Where [Type] should be:
- **(Real)** for documented, evidence-based implementations with verified outcomes
- **(Fictive)** for illustrative examples that demonstrate potential applications but haven't been implemented

All case studies should clearly indicate their type, with both real and fictive examples serving distinct purposes:
- **Real case studies** provide empirical evidence of successful implementation and should include specific metrics, time periods, and documented outcomes
- **Fictive case studies** illustrate potential applications in hypothetical scenarios and should be plausible, internally consistent, and clearly aligned with framework principles

The framework should strive to include both types, with real examples demonstrating proven approaches and fictive examples showcasing potential applications in contexts where implementation is still emerging.


### 4. Cross-References

Use consistent cross-reference formats:

```markdown
<!-- Within same framework -->
[Core Principles](/framework/docs/implementation/digital#core-principles)

<!-- To other frameworks -->
[Climate & Energy Governance](/framework/docs/implementation/energy)

<!-- To tools -->
[Conflict Analysis Framework](/framework/tools/peace/conflict-analysis-framework-en.pdf)
```

### 5. URL Path Structure and Naming

URLs are a critical part of framework accessibility, navigation, and search optimization. Follow these guidelines for consistent and effective path structures:

#### Path Naming Principles

- **Clarity over brevity**: Use descriptive paths that clearly indicate content purpose, even if slightly longer
  - Preferred: `/environmental-stewardship` 
  - Avoid: `/environment` (too general)

- **Kebab-case format**: Use hyphens to separate words in all URL paths
  - Correct: `/water-energy-food-nexus`
  - Avoid: `/waterenergyfood` or `/water_energy_food`

- **Hierarchical structure**: Organize paths to reflect content hierarchy
  - Framework sections: `/frameworks/environmental-stewardship`
  - Tools within frameworks: `/frameworks/environmental-stewardship/tools`

- **Avoid unnecessary terms**: Remove articles and common prepositions
  - Preferred: `/stakeholder-engagement`
  - Avoid: `/the-stakeholder-engagement-guide`

#### Implementation Recommendations

- **Redirect strategy**: Implement redirects from shorter or logical alternative paths to canonical URLs
  - Example: `/environment` redirects to `/environmental-stewardship`

- **Language handling**: Language selection is managed via the site header selector, not in URL paths
  - Content is organized in the repository by language subdirectories (e.g., `/en/`, `/sv/`)
  - Public-facing URLs remain language-agnostic, with the user's language preference determining which content is displayed

- **Version indicators**: Include version numbers for versioned documentation when applicable
  - Example: `/environmental-stewardship/v2/implementation`

- **URL stability**: Once published, maintain URL paths even if titles change to prevent broken links
  - Implement redirects if structural changes are necessary

- **Path depth**: Limit path depth to 3-4 levels maximum for usability
  - Manageable: `/frameworks/environmental-stewardship/tools/seed-kit`
  - Avoid: `/frameworks/environmental/stewardship/implementation/tools/community/seed-kit`

Following these guidelines ensures that URLs contribute to overall framework usability, discoverability, and long-term maintenance while establishing a consistent pattern across all digital resources.

## Content Formatting

### 1. Headings

- **Section Titles**: Use H1 (`#`) only once per file
- **Subsections**: Use H2 (`##`) as the primary division
- **Deep Nesting**: Use H3-H5 (`###`, `####`, `#####`) for nested content
- **Heading Style**: Use title case for all headings
- **ID Anchors**: Add `<a id="anchor-name"></a>` before headings for cross-references

### 2. Text Formatting

- **Emphasis**: Use bold (`**text**`) for definitions, key points, and important terms
- **Italics**: Use italics (`*text*`) for foreign terms or mild emphasis
- **Lists**: Use unordered lists for collections without sequence; ordered lists for sequential steps
- **Blockquotes**: Use for case examples, quotes, and highlighted insights

Example:
```markdown
**Implementation Timeline** represents the scheduled progression of activities. *Teoria nodi* (node theory) informs this approach.

Key activities include:
- Stakeholder mapping
- Resource assessment
- Governance establishment

Follow these steps in order:
1. Form the core team
2. Conduct baseline assessment
3. Deploy initial mechanisms
```

### 3. Case Studies and Examples

Format all case studies consistently:

```markdown
**Case Study**: [Title]

[Region/Organization], [Year Range] implemented [approach] addressing [challenge]. Key outcomes included [measurable results]. This example demonstrates [principle/lesson relevant to framework].

**Example**: In Rwanda's post-genocide MHPSS initiatives, community-based sociotherapy facilitated collective healing for over 120,000 participants, processing 1.9 million cases while improving mental health and conflict management capacities.
```

### 4. Implementation Guidance

Structure implementation sections consistently:

```markdown
### Step X: [Action Title] ([Timeframe])
- **Action**: Implement [specific approach] to achieve [outcome].
  - [Bullet points with specific tasks/substeps]
  - [Additional implementation details]
- **Tool**: **[Tool Name]** for [purpose].
- **Metric**: [Target]% [achievement] by [date], tracked via [method].
- **Actors**: [Responsible stakeholders].
```

### 5. Risk and Mitigation Tables

Use consistent table format for risks:

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk description] | Low/Medium/High | Low/Medium/High | [Specific mitigation strategies] |

## Visual Elements

### 1. Diagrams

- **File Format**: SVG preferred for web; PNG as fallback
- **Naming Convention**: `[framework]-[concept]-[diagram-type].svg`
- **Color Palette**: Use the established color scheme (primary: #3A6EA5, #6DAA3F, #C43B3B, #F5A623)
- **Alt Text**: All diagrams must include descriptive alt text

### 2. Tables

Format tables with header row emphasis:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Content  | Content  | Content  |
```

### 3. User Interface Elements

- **Buttons**: Reference using bold with descriptive text, e.g., **Submit Form button**
- **Fields**: Reference using italics, e.g., *Email Address field*
- **Menu Paths**: Use > to indicate navigation, e.g., Settings > Preferences > Notifications

## Terminology and Language

### 1. Voice and Tone

- **Voice**: Authoritative yet accessible; balancing technical precision with clarity
- **Tone**: Hopeful and action-oriented, emphasizing possibility while acknowledging challenges
- **Perspective**: Use third person for frameworks ("The framework provides...") and second person for guidance ("You can implement...")

### 2. Common Terms

Standardize these key terms across all frameworks:

| Term | Definition | Usage Notes |
|------|------------|-------------|
| Framework | The complete governance system for a domain | Capitalize when referring to specific frameworks |
| Implementation | The process of deploying framework components | Use "implementation" not "execution" |
| Governance | The systems for decision-making and accountability | Distinguish from "government" |
| Stakeholder | Any entity affected by or influencing the framework | Be specific about stakeholder types when possible |
| Node | A local implementation unit | Consistent across all frameworks |
| Hub | A regional coordination entity | Consistent across all frameworks |
| Council | A governing body at any level | Specify level (Local, Regional, Global) |

### 3. Abbreviations and Acronyms

- Define all acronyms on first use in each document: "Adaptive Universal Basic Income (AUBI)"
- Create glossary sections in framework indexes for reference
- Minimize acronym usage in user-facing documentation

### 4. Inclusive Language

- Use gender-neutral terms (e.g., "humanity" not "mankind")
- Represent diverse examples from various regions and cultures
- Avoid culturally specific metaphors that may not translate well
- Use person-first language for disabilities when appropriate

## Technical Standards

### 1. Markdown Usage

- Use dashes for unordered lists, not asterisks
- Add blank lines before and after lists and code blocks
- Use triple backticks for code blocks with language specification
- Use HTML sparingly, primarily for anchors and complex tables

### 2. File Naming

- Use kebab-case for all file names: `implementation-roadmap.md`
- Include clear descriptors in file names
- For language variants, add language code: `quick-guide-en.md`

### 3. Front Matter

Include consistent front matter:

```markdown
---
title: Full Title of Section
section: section-id
revision: Version X.X (YYYY-MM-DD)
---
```

### 4. Links and References

- Use relative paths for internal links
- Use absolute URLs for external references
- Create permanent link anchors for all major sections
- Include file extensions in links

## Multilingual Support

### 1. Translation Workflow

- Keep sentences concise to facilitate accurate translation
- Maintain original English document as the source of truth
- Update all language versions when source content changes
- Add language code to filename: `index-fr.md`

### 2. Non-Translatable Elements

- Maintain code examples in original form
- Preserve proper names unless official translations exist
- Keep standard technical terms consistent
- Maintain formatting elements across translations

### 3. Cultural Adaptation

- Replace culture-specific examples with relevant local examples
- Adapt metaphors to maintain meaning across cultures
- Adjust reading level to equivalent complexity in target language
- Consider regional variations within languages (e.g., Latin American Spanish vs. European Spanish)

## Tools and Resources Documentation

### 1. Tool Description Format

```markdown
## Tool Name

**Purpose**: Brief description of what the tool does

**Format**: [PDF/Interactive/Template/App]

**Primary Users**: [Stakeholder types]

**When to Use**: Guidance on appropriate use cases

**Key Features**:
- Feature one
- Feature two

**Integration**: How this tool connects with other framework components

**Access**: [Link to tool]
```

### 2. Usage Examples

Include concrete examples showing how to use tools:

```markdown
**Example Usage**: A community in Bangladesh used the Resource Mapping Tool to identify local assets before establishing their Digital Commons Node, resulting in 40% higher participation rates.
```

## Specific Framework Elements

Each framework may have unique elements, but should adapt them to these general guidelines while maintaining framework-specific terminology where necessary.

## Implementation and Maintenance

This style guide will be:
- Referenced during content creation and review
- Updated annually based on user feedback
- Applied gradually to existing content
- Enforced for all new content

## Appendix: Quick Reference

### Document Structure Checklist
- [ ] Appropriate title and front matter
- [ ] Table of contents
- [ ] Estimated reading time
- [ ] Introduction paragraph
- [ ] Consistent heading structure
- [ ] Cross-references to related content
- [ ] Conclusion or summary

### Formatting Checklist
- [ ] Headings use correct hierarchy
- [ ] Lists formatted consistently
- [ ] Tables have header rows
- [ ] Code blocks specify language
- [ ] Images include alt text
- [ ] Links use proper format
- [ ] Case studies follow template
