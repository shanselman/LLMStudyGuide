#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateManifest() {
    const currentDir = process.cwd();
    
    try {
        // Find all .md files that start with a number
        const markdownFiles = fs.readdirSync(currentDir)
            .filter(file => file.endsWith('.md') && /^\d/.test(file))
            .sort();

        let totalLinks = 0;
        const files = markdownFiles.map(file => {
            const linkCount = countLinksInFile(path.join(currentDir, file));
            totalLinks += linkCount;
            
            return {
                name: file,
                title: formatTitle(file),
                linkCount: linkCount
            };
        });

        // Create manifest.json
        const manifest = {
            files: files,
            totalLinks: totalLinks,
            generated: new Date().toISOString()
        };

        fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
        
        // Also create a simple files.txt for fallback
        const filesList = files.map(f => f.name).join('\n');
        fs.writeFileSync('files.txt', filesList);
        
        console.log(`Generated manifest for ${files.length} markdown files with ${totalLinks} total links:`);
        files.forEach(file => console.log(`  - ${file.title} (${file.name}) - ${file.linkCount} links`));
        
    } catch (error) {
        console.error('Error generating manifest:', error.message);
        process.exit(1);
    }
}

function countLinksInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Match markdown links: [text](url) and exclude anchor links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
            const url = match[2].trim();
            const text = match[1].trim();
            
            // Skip empty links, anchors, or relative links
            if (url && !url.startsWith('#') && text) {
                links.push({ url, text });
            }
        }
        
        return links.length;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return 0;
    }
}

function formatTitle(filename) {
    return filename
        .replace('.md', '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

if (require.main === module) {
    generateManifest();
}

module.exports = { generateManifest };