module.exports = {
  '**/package.json': ['pnpm format:package'],
  '*.{ts,tsx,html,json}': () => ['pnpm format:code', 'pnpm lint'],
}
