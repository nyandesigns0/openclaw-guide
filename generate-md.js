const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');

/**
 * Standardized Metadata Extractor & Converter
 * 
 * This script transforms a directory of markdown files into a structured 
 * JSON index used by the documentation engine.
 */

if (!fs.existsSync(contentDir)) {
  console.error('Error: Content directory does not exist.');
  process.exit(1);
}

const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
const chaptersMap = new Map();

console.log(`Processing ${files.length} markdown files...`);

files.forEach(filename => {
  const filePath = path.join(contentDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Robust Header Extraction
  const h1Match = content.match(/^#\s+(.+)$/m);
  const h2Match = content.match(/^##\s+(.+)$/m);
  
  let chapterTitle = h1Match ? h1Match[1].trim() : 'General';
  let tabTitle = h2Match ? h2Match[1].trim() : filename.replace('.md', '');
  
  // Standardize Chapter Title (e.g., "Chapter 1 — Intro" -> "Chapter 1: Intro")
  chapterTitle = chapterTitle.replace(/\s*[—–-]\s*/, ': ');
  
  // Generate stable IDs
  const createId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  let chapterId = createId(chapterTitle);
  if (chapterTitle.toLowerCase().includes('introduction')) chapterId = 'intro';
  if (chapterTitle.toLowerCase().includes('architecture')) chapterId = 'architecture';

  // Determine Icon based on title keywords
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('intro')) return "Info";
    if (t.includes('archi')) return "Layers";
    if (t.includes('config') || t.includes('setup')) return "Settings";
    if (t.includes('guide') || t.includes('how')) return "BookOpen";
    if (t.includes('api') || t.includes('dev')) return "Code";
    return "FileText";
  };

  if (!chaptersMap.has(chapterTitle)) {
    chaptersMap.set(chapterTitle, {
      id: chapterId,
      title: chapterTitle,
      icon: getIcon(chapterTitle),
      subtabs: []
    });
  }
  
  chaptersMap.get(chapterTitle).subtabs.push({
    id: filename.replace('.md', ''),
    title: tabTitle,
    filename: filename,
    // Add metadata for "Standardized" conversion
    updatedAt: fs.statSync(filePath).mtime
  });
});

// Sort and Finalize
const indexContent = Array.from(chaptersMap.values())
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));

indexContent.forEach(chapter => {
  chapter.subtabs.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
});

// Output standardized JSON
fs.writeFileSync(
  path.join(contentDir, 'index.json'), 
  JSON.stringify(indexContent, null, 2)
);

console.log('✅ Standardized index.json generated successfully!');
