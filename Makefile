# Build and check. See Docs/SPEC.md §5 and §10 for where this is up to.
#
# Unlike the siblings there is no pipeline and nothing to fetch: the content is
# the knowledge base in Docs/knowledge, which the site reads directly. So there
# is no `data` step; `verify` checks the bundle, and `build` checks the pages.

SITE := site

.PHONY: help install verify build drafts links preview check clean

help:
	@grep -E '^[a-z-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "};{printf "  %-10s %s\n", $$1, $$2}'

install: ## Install the site's dependencies
	cd $(SITE) && npm ci

verify: ## Check the knowledge base: conformance, links, references, staleness, the ledger
	cd $(SITE) && npm run verify

build: ## Verify, build the site and its search index, check every page, then every link
	cd $(SITE) && npm run build
	python3 scripts/check_site.py

drafts: ## Build with the local-only review pages (/draft/...); never deployed
	cd $(SITE) && DRAFTS=1 npm run build

links: ## Check the built site for links that go nowhere
	python3 scripts/check_site.py

preview: ## Serve the built site (check against this, never against astro dev)
	cd $(SITE) && npm run preview

check: ## Type check
	cd $(SITE) && npm run check

clean:
	rm -rf $(SITE)/dist $(SITE)/node_modules/.astro
