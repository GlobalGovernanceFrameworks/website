// src/routes/specifications/[slug]/+page.js

import { loadDocumentPage } from '$lib/data/loadDocumentPage.js';

export const csr = true;

export function load(event) {
  return loadDocumentPage({ ...event, kind: 'specification' });
}
