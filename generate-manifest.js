#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateManifest() {
    const currentDir = process.cwd();
    
    try {
        // Find all .md files in the current directory
        const files = fs.readdirSync(currentDir)
            .filter(file => file.endsWith('.md'))
            .map(file => ({
                name: file,
                title: formatTitle(file)
            }));

        // Create manifest.json
        const manifest = {
            files: files,
            generated: new Date().toISOString()
        };

        fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
        
        // Also create a simple files.txt for fallback
        const filesList = files.map(f => f.name).join('\n');
        fs.writeFileSync('files.txt', filesList);
        
        console.log(`Generated manifest for ${files.length} markdown files:`);
        files.forEach(file => console.log(`  - ${file.title} (${file.name})`));
        
    } catch (error) {
        console.error('Error generating manifest:', error.message);
        process.exit(1);
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