I've created a comprehensive Webpack boilerplate for multi-page website development with Twig templating, Sass/SCSS, and Tailwind CSS v4. Here are the key features:

Key Features:
Multi-page Setup: Automatically detects .twig files in src/pages/ and generates corresponding HTML files
Twig Templating: Full support with base templates, components, and data injection
Sass/SCSS: Complete preprocessing with imports and custom variables
Tailwind CSS v4: Latest alpha version with custom configuration
Modern Build Pipeline: Webpack 5 with optimization for both development and production
Asset Management: Automatic handling of images, fonts, and other assets

Build Output:
Development: Unminified files with source maps and hot reload
Production: Minified HTML, CSS, and JS with content hashing for cache busting

File Structure:
The boilerplate includes a well-organized structure with:
Templates and components for reusability
SCSS architecture with base, components, layout,


File Structure (continued):
The boilerplate includes a well-organized structure with:

Templates and components for reusability
SCSS architecture with base, components, layout, and page-specific styles
Modular JavaScript with separate utility modules
Global data file for site-wide variables
Asset directories for images and fonts

How It Works:

Page Detection: The webpack config automatically scans src/pages/ for .twig files and creates corresponding HTML pages
Template Inheritance: Uses Twig's extends and include system for maintainable templates
Asset Pipeline: Processes and optimizes all assets (CSS, JS, images, fonts)
Development Server: Hot reload with file watching for immediate feedback
Production Build: Generates optimized, minified files ready for deployment

Quick Start:

Copy all the files to your project directory
Run npm install
Run npm run dev for development
Run npm run build for production

The webpack configuration automatically handles:

Page detection from src/pages/*.twig
Asset bundling and optimization
CSS and JS minification
Content hashing for cache busting
Source maps for debugging

You can start adding new pages immediately by creating .twig files in the src/pages/ directory - they'll automatically be built into corresponding HTML files!
