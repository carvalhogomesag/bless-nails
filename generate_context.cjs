#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DEFAULT_OUTPUT = 'ai-context.txt';
const DEFAULT_INCLUDE_DIRS = ['src'];
const DEFAULT_INCLUDE_FILES = ['README.md', 'netlify.toml', 'package.json', 'tsconfig.json', 'vite.config.ts', 'index.html'];
const DEFAULT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.md', '.json', '.toml', '.env', '.txt']);
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.netlify', '.next', '.cache', 'coverage']);

function parseArgs(argv) {
  const args = {
    out: DEFAULT_OUTPUT,
    dirs: [...DEFAULT_INCLUDE_DIRS],
    files: [...DEFAULT_INCLUDE_FILES],
    maxBytesPerFile: 200_000,
    includeExtensions: new Set(DEFAULT_EXTENSIONS),
  };

  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];

    if (token === '--out' && argv[i + 1]) {
      args.out = argv[++i];
      continue;
    }

    if (token === '--dirs' && argv[i + 1]) {
      args.dirs = argv[++i].split(',').map((v) => v.trim()).filter(Boolean);
      continue;
    }

    if (token === '--files' && argv[i + 1]) {
      args.files = argv[++i].split(',').map((v) => v.trim()).filter(Boolean);
      continue;
    }

    if (token === '--max-bytes' && argv[i + 1]) {
      const parsed = Number(argv[++i]);
      if (!Number.isNaN(parsed) && parsed > 0) {
        args.maxBytesPerFile = parsed;
      }
      continue;
    }

    if (token === '--ext' && argv[i + 1]) {
      const extList = argv[++i]
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((ext) => (ext.startsWith('.') ? ext : `.${ext}`));
      args.includeExtensions = new Set(extList);
      continue;
    }
  }

  return args;
}

function isTextFileByExtension(filePath, includeExtensions) {
  const ext = path.extname(filePath).toLowerCase();
  return includeExtensions.has(ext);
}

function walkDir(dirPath, includeExtensions, out = []) {
  if (!fs.existsSync(dirPath)) return out;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      walkDir(fullPath, includeExtensions, out);
      continue;
    }

    if (!entry.isFile()) continue;
    if (isTextFileByExtension(fullPath, includeExtensions)) out.push(fullPath);
  }

  return out;
}

function toRel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function safeRead(filePath, maxBytes) {
  const stats = fs.statSync(filePath);
  if (stats.size > maxBytes) {
    return {
      skipped: true,
      reason: `Arquivo excede limite de ${maxBytes} bytes (${stats.size} bytes).`,
      content: '',
    };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return { skipped: false, reason: '', content };
}

function uniqueSorted(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function buildContext(args) {
  const collected = [];

  for (const dir of args.dirs) {
    const fullDir = path.resolve(ROOT, dir);
    walkDir(fullDir, args.includeExtensions, collected);
  }

  for (const file of args.files) {
    const fullFile = path.resolve(ROOT, file);
    if (fs.existsSync(fullFile) && fs.statSync(fullFile).isFile()) {
      collected.push(fullFile);
    }
  }

  const files = uniqueSorted(collected.map(toRel));

  const header = [
    '# AI Context Export',
    '',
    `Gerado em: ${new Date().toISOString()}`,
    `Projeto: ${path.basename(ROOT)}`,
    `Arquivos incluídos: ${files.length}`,
    '',
    '---',
    '',
  ];

  const body = [];

  for (const relPath of files) {
    const absPath = path.resolve(ROOT, relPath);
    const { skipped, reason, content } = safeRead(absPath, args.maxBytesPerFile);

    body.push(`## FILE: ${relPath}`);
    body.push('```');

    if (skipped) {
      body.push(`[SKIPPED] ${reason}`);
    } else {
      body.push(content);
    }

    body.push('```');
    body.push('');
  }

  return [...header, ...body].join('\n');
}

function main() {
  const args = parseArgs(process.argv);
  const output = buildContext(args);
  const outPath = path.resolve(ROOT, args.out);

  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`Contexto gerado com sucesso: ${toRel(outPath)}`);
}

main();
