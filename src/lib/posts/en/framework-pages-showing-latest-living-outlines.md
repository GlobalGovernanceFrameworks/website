---
title: "Framework Pages Now Show the Latest Living Outlines"
description: "The website now presents each framework through its latest outline, with faster builds, clearer navigation, and improved mobile layouts"
date: "2026-08-03"
author: "Björn K. Holmström"
category: "update"
tags: ["frameworks", "website", "performance", "open-source", "design"]
hashtags: ["GlobalGovernance", "OpenSource", "WebDevelopment"]
---

**Framework pages now show the latest living outlines**

The Global Governance Frameworks website has changed how framework documents are presented.

Instead of displaying frameworks as if they were fully drafted and finished documents, each framework page now shows its latest canonical outline. This better reflects the actual nature of the project: an evolving, open-source governance architecture whose components remain open to review, revision, and improvement.

The new framework pages include:

* The latest outline for each framework
* Current version information
* Review and development provenance
* A dedicated table of contents for navigating longer documents
* English fallback when a translated outline is not yet available

Historical versions, reviews, and drafting materials remain preserved in the repository. They are no longer treated as public website pages or compiled unnecessarily during every build.

This change also made it possible to substantially improve website performance. Previously, the build system discovered and processed large numbers of archived Markdown files, including old framework versions and review documents that were never rendered. The site now compiles only each framework’s current outline, while a lightweight generated manifest provides version and review-history metadata.

The result is a noticeably faster and more maintainable build process.

Several related layout and navigation improvements were made at the same time:

* Framework pages now use more of the available screen width
* Mobile layouts have been corrected and simplified
* The old framework sidebar has been removed
* Duplicate outline modals have been retired
* Ambiguous status labels such as “Ready,” “In Review,” and “Planned” have been removed
* The framework overview now serves as the main ecosystem map, while individual pages serve as the canonical documents

These changes make the website more honest about the maturity of the work, easier to navigate, and easier to maintain.

The goal is not to present governance frameworks as completed products. It is to make their current structure visible enough that people can understand them, challenge them, improve them, and eventually help translate them into practice.

