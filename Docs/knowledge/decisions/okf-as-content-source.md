---
type: Decision
title: "The knowledge bundle is the content source"
description: "Every word and every mapping the site shows is compiled from this bundle at build time. There is no second copy of the content in JSON."
tags: [decision, engineering, okf]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
---

# Proposal

The prototype kept its content in four JSON files and a separate OKF brain
about the project. Here the two merge: the bundle holds the content itself,
one concept per article, right, component and instrument, with structured
frontmatter. The site reads it through Astro content collections (a glob loader
over `Docs/knowledge/`), validated by schemas, so no YAML library or extra
pipeline is needed.

# Why

- One source: the prototype's markdown twin once described a retired
  prototype because it was generated from the wrong file.
- The bundle is published as is for agents, with no drift from the site.
- Review status, staleness and provenance live beside the content they
  describe, and the build can enforce them.

Status: draft until David agrees. See [SPEC.md](../../SPEC.md) §5.
