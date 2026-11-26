// Bundles the ES modules from src/ into the single classic script app.js,
// so index.html keeps working when opened directly from disk (file://).
import * as esbuild from 'esbuild';

const options = {
  entryPoints: ['src/main.js'],
  outfile: 'app.js',
  bundle: true,
  format: 'iife',
  charset: 'utf8',
  logLevel: 'info',
  banner: {
    js: '// GENERATED FILE — do not edit. Edit the modules in src/ and run `npm run build:js`.\n"use strict";',
  },
};

if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
