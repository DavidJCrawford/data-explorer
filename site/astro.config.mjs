// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Project site served from https://<user>.github.io/data-explorer/,
 * so `base` must be set. The GitHub Actions workflow passes the value that
 * actions/configure-pages reports; this fallback keeps a local build the same.
 * Rename the repository and this together.
 */
const base = process.env.BASE_PATH ?? '/data-explorer';

export default defineConfig({
  site: 'https://davidjcrawford.github.io',
  base,
  trailingSlash: 'always',
  /* Astro's HTML compression deletes a newline between running text and an
     inline element instead of collapsing it to a space, so "published by\n<a>"
     ships as "published by<a>". Invisible in the source. Carried from the
     siblings, where it shipped broken sentences before anyone noticed. */
  compressHTML: false,
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },

  // Self-hosted, subset and preloaded, exactly as the siblings do it.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Albert Sans',
      cssVariable: '--ks-font',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Avenir Next', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Alumni Sans',
      cssVariable: '--ks-font-display',
      weights: [200, 300],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Albert Sans', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--ks-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
  ],
});
