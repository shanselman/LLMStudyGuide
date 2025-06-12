class MarkdownBrowser {
    constructor() {
        this.fileList = document.getElementById('fileList');
        this.contentTitle = document.getElementById('contentTitle');
        this.contentBody = document.getElementById('contentBody');
        this.markdownFiles = [];
        this.currentFile = null;
        
        this.init();
    }

    async init() {
        await this.loadMarkdownFiles();
        this.renderFileList();
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

            // Fallback: assume common markdown files exist
            this.markdownFiles = [
                { name: 'introduction.md', title: 'Introduction' },
                { name: 'basic-concepts.md', title: 'Basic Concepts' },
                { name: 'advanced-topics.md', title: 'Advanced Topics' },
                { name: 'practical-applications.md', title: 'Practical Applications' }
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
            
            this.contentTitle.textContent = this.formatTitle(filename);
            this.contentBody.innerHTML = html;
            
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
}

// Initialize the markdown browser when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownBrowser();
});