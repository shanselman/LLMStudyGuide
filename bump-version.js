#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function bumpVersion() {
    const indexPath = path.join(__dirname, 'index.html');
    
    try {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Find current version in CSS and JS links
        const cssVersionMatch = content.match(/styles\.css\?v=([0-9.]+)/);
        const jsVersionMatch = content.match(/script\.js\?v=([0-9.]+)/);
        
        if (!cssVersionMatch || !jsVersionMatch) {
            console.error('Version strings not found in index.html');
            return;
        }
        
        // Get current version and increment
        const currentVersion = cssVersionMatch[1];
        const versionParts = currentVersion.split('.');
        const majorVersion = parseInt(versionParts[0]);
        const minorVersion = parseInt(versionParts[1]) + 1;
        const newVersion = `${majorVersion}.${minorVersion}`;
        
        // Replace both CSS and JS versions
        content = content.replace(/styles\.css\?v=[0-9.]+/, `styles.css?v=${newVersion}`);
        content = content.replace(/script\.js\?v=[0-9.]+/, `script.js?v=${newVersion}`);
        
        // Write back to file
        fs.writeFileSync(indexPath, content);
        
        console.log(`✅ Version bumped from ${currentVersion} to ${newVersion}`);
        console.log('Cache busting strings updated in index.html');
        
    } catch (error) {
        console.error('Error bumping version:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    bumpVersion();
}

module.exports = { bumpVersion };