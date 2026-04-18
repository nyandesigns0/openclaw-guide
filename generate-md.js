const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');

if (!fs.existsSync(contentDir)) {
  console.error('Content directory does not exist.');
  process.exit(1);
}

const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

const chaptersMap = new Map();

files.forEach(filename => {
  const filePath = path.join(contentDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split(/\r?\n/);
  
  let chapterTitle = null;
  let tabTitle = null;
  
  for (const line of lines) {
    if (!chapterTitle && line.startsWith('# ')) {
      chapterTitle = line.substring(2).trim();
      // Normalize "Chapter 1 — Introduction" to "Chapter 1: Introduction" for index
      chapterTitle = chapterTitle.replace(' — ', ': ');
    } else if (!tabTitle && line.startsWith('## ')) {
      tabTitle = line.substring(3).trim();
    }
    if (chapterTitle && tabTitle) break;
  }
  
  if (!chapterTitle) chapterTitle = 'Unknown Chapter';
  if (!tabTitle) tabTitle = 'Unknown Tab';
  
  // Create an ID for the chapter
  let chapterId = chapterTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (chapterTitle.includes('Introduction')) chapterId = 'intro';
  else if (chapterTitle.includes('Architecture')) chapterId = 'architecture';
  
  if (!chaptersMap.has(chapterTitle)) {
    let icon = "FileText";
    if (chapterTitle.includes("Introduction")) icon = "Info";
    else if (chapterTitle.includes("Architecture")) icon = "Layers";
    
    chaptersMap.set(chapterTitle, {
      id: chapterId,
      title: chapterTitle,
      icon: icon,
      subtabs: []
    });
  }
  
  chaptersMap.get(chapterTitle).subtabs.push({
    id: filename.replace('.md', ''),
    title: tabTitle,
    filename: filename
  });
});

const indexContent = Array.from(chaptersMap.values());

// Sort chapters
indexContent.sort((a, b) => a.title.localeCompare(b.title));

// Sort subtabs by filename
indexContent.forEach(chapter => {
  chapter.subtabs.sort((a, b) => a.filename.localeCompare(b.filename));
});

fs.writeFileSync(path.join(contentDir, 'index.json'), JSON.stringify(indexContent, null, 2));

console.log('index.json generated successfully from markdown files in the content directory!');
