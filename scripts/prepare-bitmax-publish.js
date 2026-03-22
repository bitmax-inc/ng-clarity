/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
  console.error('Usage: node scripts/prepare-bitmax-publish.js <version>');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
const manifests = [
  {
    label: '@bitmax/clr-ui',
    path: path.join(repoRoot, 'dist/clr-ui/package.json'),
    update(manifest) {
      manifest.version = version;
    },
  },
  {
    label: '@bitmax/clr-angular',
    path: path.join(repoRoot, 'dist/clr-angular/package.json'),
    update(manifest) {
      manifest.version = version;
      manifest.peerDependencies = manifest.peerDependencies || {};
      manifest.peerDependencies['@bitmax/clr-ui'] = version;
    },
  },
  {
    label: '@bitmax/clr-addons',
    path: path.join(repoRoot, 'dist/clr-addons/package.json'),
    update(manifest) {
      manifest.version = version;
    },
  },
];

for (const entry of manifests) {
  if (!fs.existsSync(entry.path)) {
    console.error(`Missing package manifest for ${entry.label}: ${entry.path}`);
    console.error('Build the packages first with npm run _build:angular && npm run _build:addons && npm run _build:ui');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(entry.path, 'utf8'));
  entry.update(manifest);
  fs.writeFileSync(entry.path, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Prepared ${entry.label} ${version}`);
}
