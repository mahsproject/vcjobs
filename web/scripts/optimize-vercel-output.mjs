import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('web/.vercel/output');
const functionsDir = path.join(outputDir, 'functions');
const configPath = path.join(outputDir, 'config.json');

if (fs.existsSync(configPath) && fs.existsSync(functionsDir)) {
  console.log('Optimizing Vercel Build Output for single index.func serverless deployment...');

  // 1. Locate the compiled SvelteKit serverless function bundle
  let sourceCatchall = path.join(functionsDir, '![-]', 'catchall.func');
  if (!fs.existsSync(sourceCatchall)) {
    sourceCatchall = path.join(functionsDir, 'catchall.func');
  }

  const targetIndexFunc = path.join(functionsDir, 'index.func');
  const tempDir = path.join(outputDir, '__catchall_temp.func');

  if (fs.existsSync(sourceCatchall)) {
    // Move catchall.func out to tempDir
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.renameSync(sourceCatchall, tempDir);

    // Remove all 268 symlinks and empty folders
    fs.rmSync(functionsDir, { recursive: true, force: true });
    fs.mkdirSync(functionsDir, { recursive: true });

    // Move to canonical functions/index.func
    fs.renameSync(tempDir, targetIndexFunc);
    console.log('Moved SvelteKit serverless bundle to functions/index.func');
  } else if (!fs.existsSync(targetIndexFunc)) {
    console.error('Warning: could not locate catchall function in', functionsDir);
  }

  // 2. Configure config.json routes
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const originalRoutes = Array.isArray(config.routes) ? config.routes : [];

  // Retain filesystem and static/prerendered redirects, but route all server traffic to index.func with __pathname
  const newRoutes = [];
  for (const r of originalRoutes) {
    if (r.handle === 'filesystem') {
      newRoutes.push(r);
      break;
    }
    // Keep redirects, header rules, and immutable caching rules
    if (!r.dest || r.status || r.continue) {
      newRoutes.push(r);
    }
  }

  // If handle: filesystem was not found, add it
  if (!newRoutes.some((r) => r.handle === 'filesystem')) {
    newRoutes.push({ handle: 'filesystem' });
  }

  // Direct all remaining requests to the single index.func serverless function,
  // passing __pathname so SvelteKit's serverless handler restores the exact requested URL.
  newRoutes.push({
    src: '^/(.*)$',
    dest: '/index?__pathname=/$1',
  });

  config.routes = newRoutes;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('Updated config.json routes to route via /index?__pathname=/$1');
  console.log('Optimization complete: 1 serverless function (index.func) ready.');
} else {
  console.log('No .vercel/output found, skipping optimization.');
}
