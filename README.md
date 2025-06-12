# LLM Interview Questions Browser

A static website for browsing markdown files containing LLM interview questions and answers, originally compiled by **Hao Hoang**.

## Setup

1. Place your numbered markdown files in the `content/` directory
2. Run the manifest generator to create the file list:
   ```bash
   node generate-manifest.js
   ```
3. Open `index.html` in your browser or serve it with a local server

## Using a Local Server

For best results, serve the files with a local HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Features

- Clean left-rail navigation
- Markdown rendering with syntax highlighting
- Responsive design
- Proper attribution to original content creator
- Auto-discovery of markdown files

## Credits

- **Original PDF Content**: [Hao Hoang](https://www.linkedin.com/posts/hoang-van-hao_top-50-linkedin-llm-interview-questions-activity-7332959385280778240-lyU0/)
- **Website Implementation**: Scott Hanselman