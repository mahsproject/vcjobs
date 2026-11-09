import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('web/.vercel/output');
const functionsDir = path.join(outputDir, 'functions');
const configPath = path.join(outputDir, 'config.json');

if (fs.existsSync(configPath) && fs.existsSync(functionsDir)) {
  console.log('Optimizing Vercel Build Output for single-function deployment...');

  // 1. Update config.json routes so all dynamic routes point to /![-]/catchall
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (Array.isArray(config.routes)) {
    config.routes = config.routes.map((r) => {
      if (r.dest && !r.dest.startsWith('/![-]')) {
        return { ...r, dest: '/![-]/catchall' };
      }
      return r;
    });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('Updated config.json routes to catchall function.');
  }

  // 2. Remove all redundant .func symlinks/directories except '![-]'
  let removed = 0;
  function cleanFunctions(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, item.name);
      if (item.name === '![-]') {
        continue; // Preserve the real SvelteKit serverless catchall function
      }
      if (item.name.endsWith('.func') || item.name.endsWith('.prerender-config.json')) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        removed++;
      } else if (item.isDirectory()) {
        cleanFunctions(fullPath);
        try {
          if (fs.readdirSync(fullPath).length === 0) {
            fs.rmdirSync(fullPath);
          }
        } catch {}
      }
    }
  }

  cleanFunctions(functionsDir);
  console.log(`Cleaned up ${removed} redundant function symlinks. Exactly 1 serverless function remains.`);
} else {
  console.log('No .vercel/output found, skipping optimization.');
}
