#!/usr/bin/env node

const { execSync } = require('child_process');
const { bumpVersion } = require('./bump-version');
const { generateManifest } = require('./generate-manifest');

function deploy() {
    try {
        console.log('🚀 Starting deployment process...\n');
        
        // Step 1: Generate manifest
        console.log('📋 Generating manifest...');
        generateManifest();
        console.log('✅ Manifest generated\n');
        
        // Step 2: Bump version for cache busting
        console.log('🔄 Bumping version...');
        bumpVersion();
        console.log('✅ Version bumped\n');
        
        // Step 3: Show git status
        console.log('📊 Git status:');
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            if (status.trim()) {
                console.log(status);
            } else {
                console.log('No changes detected');
            }
        } catch (e) {
            console.log('Not a git repository or git not available');
        }
        
        console.log('\n✅ Deployment preparation complete!');
        console.log('\n📝 Next steps:');
        console.log('   1. Review changes with: git diff');
        console.log('   2. Commit changes with: git add . && git commit -m "Deploy: version bump and manifest update"');
        console.log('   3. Push to deploy: git push');
        console.log('\n💡 The version bump will force browsers to fetch fresh JS/CSS files');
        
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    deploy();
}

module.exports = { deploy };