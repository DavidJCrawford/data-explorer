/** The disclaimer, in one place. No lawyer has reviewed this site and none
 *  will (SPEC §9.6), so every surface that states the law says so instead.
 *  Text from Docs/knowledge/policies/legal-rigour.md, rule 7.
 *
 *  scripts/verify.mjs fails the build if a built page lacks the
 *  `data-disclaimer` marker, so render it through components/Disclaimer.astro
 *  rather than retyping it. */
export const DISCLAIMER_SHORT = 'Not legal advice. The author’s own reading of the law, not reviewed by a lawyer.';

export const DISCLAIMER =
  'Not legal advice. This is the author’s own reading of the law, written to help facilities managers ' +
  'ask better questions. It has not been reviewed by a lawyer. For decisions, read the official text ' +
  'and take legal advice.';
