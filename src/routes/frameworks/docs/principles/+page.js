// src/routes/frameworks/docs/principles/+page.js
// Deliberately keep the initial SSR and hydration markup identical for all
// languages. With adapter-static, ?lang=en and ?lang=sv share the same HTML file.
import EnglishPrinciples from '$lib/content/frameworks/en/principles.md';

export function load() {
  return {
    component: EnglishPrinciples,
    locale: 'en'
  };
}
