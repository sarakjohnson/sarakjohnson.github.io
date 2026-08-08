// @ts-check
import { defineConfig } from 'astro/config';

// The repo must be named sarakjohnson.github.io so the site serves from the
// root — that's why there's no `base` here.
export default defineConfig({
  site: 'https://sarakjohnson.github.io',
});
