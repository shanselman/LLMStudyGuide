class MarkdownBrowser {
    constructor() {
        this.fileList = document.getElementById('fileList');
        this.contentBody = document.getElementById('contentBody');
        this.markdownFiles = [];
        this.currentFile = null;
        this.studyProgress = new StudyProgressTracker(this);
        
        this.init();
    }

    async init() {
        await this.loadMarkdownFiles();
        this.renderFileList();
        this.studyProgress.initializeProgressDisplay();
        this.setupHeaderClick();
    }

    async loadMarkdownFiles() {
        try {
            // Since we're running a static site, we'll need to have a way to discover markdown files
            // This could be done by having a manifest file or by using a simple directory listing
            // For now, we'll create a placeholder that can be replaced with actual file discovery
            
            // Check if there's a manifest file
            try {
                const response = await fetch('manifest.json');
                if (response.ok) {
                    const manifest = await response.json();
                    this.markdownFiles = manifest.files || [];
                    // Pass total links count to study progress tracker
                    if (manifest.totalLinks) {
                        this.studyProgress.setTotalLinksFromManifest(manifest.totalLinks);
                    }
                    return;
                }
            } catch (e) {
                console.log('No manifest.json found, trying directory listing...');
            }

            // Try to load from a simple text file listing
            try {
                const response = await fetch('files.txt');
                if (response.ok) {
                    const fileList = await response.text();
                    this.markdownFiles = fileList.split('\n')
                        .filter(line => line.trim() && line.endsWith('.md'))
                        .map(file => ({
                            name: file.trim(),
                            title: this.formatTitle(file.trim())
                        }));
                    return;
                }
            } catch (e) {
                console.log('No files.txt found...');
            }

            // Fallback: assume common markdown files exist in content folder
            this.markdownFiles = [
                { name: 'content/01_tokenization.md', title: '1 - Tokenization', fullTitle: 'Question 1 - Tokenization' },
                { name: 'content/02_attention_mechanism.md', title: '2 - Attention Mechanism', fullTitle: 'Question 2 - Attention Mechanism' },
                { name: 'content/03_context_window.md', title: '3 - Context Window', fullTitle: 'Question 3 - Context Window' },
                { name: 'content/04_lora_vs_qlora.md', title: '4 - Lora Vs Qlora', fullTitle: 'Question 4 - Lora Vs Qlora' }
            ];
            
        } catch (error) {
            console.error('Error loading markdown files:', error);
            this.showError('Failed to load file list');
        }
    }

    formatTitle(filename) {
        return filename
            .replace('.md', '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    renderFileList() {
        if (this.markdownFiles.length === 0) {
            this.fileList.innerHTML = '<div class="no-files">No markdown files found. Make sure your markdown files are in the same directory as this HTML file.</div>';
            return;
        }

        const fileItems = this.markdownFiles.map(file => `
            <div class="file-item" data-file="${file.name}">
                <span class="file-icon">📄</span>
                <span class="file-title">${file.title}</span>
            </div>
        `).join('');

        this.fileList.innerHTML = fileItems;

        // Add click listeners
        this.fileList.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', () => {
                const filename = item.dataset.file;
                this.loadMarkdownFile(filename);
                this.setActiveFile(item);
            });
        });
    }

    setActiveFile(activeItem) {
        // Remove active class from all items
        this.fileList.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to clicked item
        activeItem.classList.add('active');
    }

    async loadMarkdownFile(filename) {
        try {
            this.showLoading();
            
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}: ${response.status}`);
            }
            
            const markdownContent = await response.text();
            this.renderMarkdown(markdownContent, filename);
            this.currentFile = filename;
            
        } catch (error) {
            console.error('Error loading markdown file:', error);
            this.showError(`Failed to load ${filename}. Make sure the file exists in the same directory.`);
        }
    }

    renderMarkdown(content, filename) {
        try {
            const html = marked.parse(content, {
                breaks: true,
                gfm: true,
                headerIds: true,
                headerPrefix: 'heading-'
            });
            
            this.contentBody.innerHTML = html;
            
            // Add study progress tracking to links
            this.studyProgress.enhanceLinksForTracking(this.contentBody, filename);
            
            // Add syntax highlighting if available
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
            
        } catch (error) {
            console.error('Error rendering markdown:', error);
            this.showError('Failed to render markdown content');
        }
    }

    showLoading() {
        this.contentBody.innerHTML = '<div class="loading">Loading content...</div>';
    }

    showError(message) {
        this.contentBody.innerHTML = `<div class="error">⚠️ ${message}</div>`;
    }

    setupHeaderClick() {
        // Make the sidebar header clickable to return to welcome page
        const siteTitle = document.getElementById('siteTitle');
        if (siteTitle) {
            siteTitle.style.cursor = 'pointer';
            siteTitle.addEventListener('click', () => {
                this.showWelcomePage();
            });
        }
    }

    showWelcomePage() {
        // Clear active file selection
        this.fileList.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Reset to welcome content
        this.contentBody.innerHTML = `
            <div class="welcome-message">
                <h2>LLM Interview Questions Browser</h2>
                <p>This resource contains interview questions and answers about Large Language Models, originally compiled by <strong>Hao Hoang</strong> in his comprehensive PDF guide.</p>
                <p>While this website was spec'd and created by <strong>Scott Hanselman</strong> as a browsable resource, all credit for the original PDF goes to <a href="https://www.linkedin.com/posts/hoang-van-hao_top-50-linkedin-llm-interview-questions-activity-7332959385280778240-lyU0/" target="_blank">Hao Hoang</a>.</p>
                <p>Select a topic from the left sidebar to begin exploring the questions and answers and study resources.</p>
                <div class="credit-links">
                    <p><a href="https://www.linkedin.com/posts/hoang-van-hao_top-50-linkedin-llm-interview-questions-activity-7332959385280778240-lyU0/" target="_blank">📄 Original PDF by Hao Hoang</a></p>
                </div>
            </div>
        `;
        
        // Clear current file tracking
        this.currentFile = null;
    }
}

class StudyProgressTracker {
    constructor(app) {
        this.app = app; // Reference to the main MarkdownBrowser instance
        this.storageKey = 'llm-study-progress';
        this.allLinksKey = 'llm-study-all-links';
        this.completedLinks = this.loadProgress();
        this.allLinks = this.loadAllLinks();
        this.progressElement = null;
        this.totalLinksFromManifest = null;
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            const progress = saved ? JSON.parse(saved) : {};
            console.log('📊 Loaded progress from localStorage:', progress);
            return progress;
        } catch (error) {
            console.error('Error loading study progress:', error);
            return {};
        }
    }

    loadAllLinks() {
        try {
            const saved = localStorage.getItem(this.allLinksKey);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading all links:', error);
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.completedLinks));
            localStorage.setItem(this.allLinksKey, JSON.stringify(this.allLinks));
            console.log('💾 Saved progress to localStorage:', this.completedLinks);
            this.updateGlobalProgress();
        } catch (error) {
            console.error('Error saving study progress:', error);
        }
    }

    generateLinkId(url, text, currentFile) {
        // Create a unique ID based on current file, URL, and text content
        const uniqueString = `${currentFile}|${url}|${text}`;
        // Use a simple hash instead of base64 to avoid collisions
        let hash = 0;
        for (let i = 0; i < uniqueString.length; i++) {
            const char = uniqueString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        const linkId = `link_${Math.abs(hash)}_${currentFile.replace('.md', '').replace(/[^a-zA-Z0-9]/g, '_')}`;
        console.log(`🔑 Generated ID for "${text}" in ${currentFile}: ${linkId}`);
        return linkId;
    }

    isLinkCompleted(linkId) {
        return this.completedLinks[linkId] || false;
    }

    toggleLinkCompletion(linkId, url, text, currentFile) {
        this.completedLinks[linkId] = !this.completedLinks[linkId];
        this.saveProgress();
        
        // Track the click event
        if (this.completedLinks[linkId]) {
            console.log(`✅ Marked as completed in ${currentFile}: ${text}`);
        } else {
            console.log(`⬜ Unmarked in ${currentFile}: ${text}`);
        }
    }

    enhanceLinksForTracking(container, currentFile) {
        const links = container.querySelectorAll('a[href]');
        console.log(`📄 Processing ${links.length} links for file: ${currentFile}`);
        
        links.forEach((link, index) => {
            const url = link.href;
            const text = link.textContent.trim();
            
            // Skip empty links or anchors
            if (!url || url.startsWith('#') || !text) return;
            
            const linkId = this.generateLinkId(url, text, currentFile);
            const isCompleted = this.isLinkCompleted(linkId);
            
            // Register this link in our global tracking
            this.registerLink(linkId, {
                url: url,
                text: text,
                file: currentFile
            });
            
            console.log(`🔗 Link ${index + 1}: "${text}" | ID: ${linkId} | Completed: ${isCompleted}`);
            
            // Create wrapper for the link with checkbox
            const wrapper = document.createElement('div');
            wrapper.className = 'study-link-wrapper';
            
            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'study-checkbox';
            checkbox.checked = isCompleted;
            checkbox.id = `checkbox-${linkId}`;
            
            // Create label for the link
            const label = document.createElement('label');
            label.className = 'study-link-label';
            label.htmlFor = `checkbox-${linkId}`;
            
            // Clone the original link
            const newLink = link.cloneNode(true);
            newLink.className = `study-link ${isCompleted ? 'completed' : ''}`;
            
            // Add click tracking to the link
            newLink.addEventListener('click', (e) => {
                // Check if this is a context link (ends with _context.md)
                const isContextLink = url.includes('_context.md');
                
                if (isContextLink) {
                    e.preventDefault(); // Prevent normal navigation
                    
                    // Extract the filename from the URL
                    const filename = url.split('/').pop();
                    const fullPath = `content/${filename}`;
                    
                    // Use the app's navigation system
                    this.app.loadMarkdownFile(fullPath);
                    
                    // Find and activate the corresponding sidebar item
                    const fileItems = document.querySelectorAll('.file-item');
                    fileItems.forEach(item => {
                        if (item.dataset.file === fullPath) {
                            this.app.setActiveFile(item);
                        }
                    });
                }
                
                // Auto-check the checkbox when link is clicked (for all links)
                setTimeout(() => {
                    if (!checkbox.checked) {
                        checkbox.checked = true;
                        this.toggleLinkCompletion(linkId, url, text, currentFile);
                        this.updateLinkAppearance(newLink, true);
                    }
                }, 100);
            });
            
            // Add checkbox change handler
            checkbox.addEventListener('change', (e) => {
                this.toggleLinkCompletion(linkId, url, text, currentFile);
                this.updateLinkAppearance(newLink, checkbox.checked);
            });
            
            // Build the new structure
            label.appendChild(newLink);
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            
            // Replace the original link
            link.parentNode.replaceChild(wrapper, link);
            
            // Update appearance based on completion status
            this.updateLinkAppearance(newLink, isCompleted);
        });
    }

    updateLinkAppearance(linkElement, isCompleted) {
        if (isCompleted) {
            linkElement.classList.add('completed');
        } else {
            linkElement.classList.remove('completed');
        }
    }

    registerLink(linkId, linkInfo) {
        this.allLinks[linkId] = linkInfo;
        // Save immediately to persist the link registry
        localStorage.setItem(this.allLinksKey, JSON.stringify(this.allLinks));
    }

    setTotalLinksFromManifest(totalLinks) {
        this.totalLinksFromManifest = totalLinks;
        console.log(`📋 Set total links from manifest: ${totalLinks}`);
        // Update progress display if it already exists
        if (this.progressElement) {
            this.updateGlobalProgress();
        }
    }

    getGlobalProgressStats() {
        // Use manifest total if available, otherwise fall back to discovered links
        const total = this.totalLinksFromManifest || Object.keys(this.allLinks).length;
        const completed = Object.values(this.completedLinks).filter(Boolean).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        console.log(`📈 Global Progress: ${completed}/${total} (${percentage}%) ${this.totalLinksFromManifest ? '[using manifest total]' : '[using discovered links]'}`);
        return { completed, total, percentage };
    }

    getFileProgressStats(filename) {
        const fileLinkIds = Object.keys(this.allLinks).filter(linkId => 
            this.allLinks[linkId].file === filename
        );
        const total = fileLinkIds.length;
        const completed = fileLinkIds.filter(linkId => this.completedLinks[linkId]).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    }

    initializeProgressDisplay() {
        // Create and inject progress indicator in sidebar
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        const progressHTML = `
            <div class="progress-indicator" id="globalProgress">
                <div class="progress-text">Study Progress</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-stats" id="progressStats">0% (0/0)</div>
            </div>
        `;

        sidebar.insertAdjacentHTML('beforeend', progressHTML);
        this.progressElement = document.getElementById('globalProgress');
        this.updateGlobalProgress();
    }

    updateGlobalProgress() {
        if (!this.progressElement) return;

        const stats = this.getGlobalProgressStats();
        const fillElement = document.getElementById('progressFill');
        const statsElement = document.getElementById('progressStats');

        if (fillElement) {
            fillElement.style.width = `${stats.percentage}%`;
        }

        if (statsElement) {
            statsElement.textContent = `${stats.percentage}% (${stats.completed}/${stats.total})`;
        }
    }

    getProgressStats() {
        // Keep for backward compatibility
        return this.getGlobalProgressStats();
    }

    clearProgress() {
        this.completedLinks = {};
        this.allLinks = {};
        this.saveProgress();
        console.log('Study progress cleared');
    }
}

// Initialize the markdown browser when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownBrowser();
});