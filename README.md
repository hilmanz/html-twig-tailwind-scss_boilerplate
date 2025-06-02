# twig - html - scss - tailwindcss boilerplate
I've created a comprehensive Webpack boilerplate for multi-page website development with **Twig templating, Sass/SCSS, and Tailwind CSS v4**.

## Key Features:
1. **Multi-page Setup:** Automatically detects <code>.twig</code> files in <code>src/pages/</code> and generates corresponding HTML files
2. **Twig Templating:** Full support with base templates, components, and data injection
3. **Sass/SCSS:** Complete preprocessing with imports and custom variables
4. **Tailwind CSS v4:** Latest alpha version with custom configuration
5. **Modern Build Pipeline:** Webpack 5 with optimization for both development and production
6. **Asset Management:** Automatic handling of images, fonts, and other assets

## Build Output:
* **Development:** Unminified files with source maps and hot reload
* **Production:** Minified HTML, CSS, and JS with content hashing for cache busting

## File Structure:
The boilerplate includes a well-organized structure with:
* Templates and components for reusability
* SCSS architecture with base, components, layout, and page-specific styles
* Modular JavaScript with separate utility modules
* Global data file for site-wide variables
* Asset directories for images and fonts

## How It Works:
1. **Page Detection:** The webpack config automatically scans <code>src/pages/</code> for <code>.twig</code> files and creates corresponding HTML pages
2. **Template Inheritance:** Uses Twig's <code>extends</code> and <code>include</code> system for maintainable templates
3. **Asset Pipeline:** Processes and optimizes all assets (CSS, JS, images, fonts)
4. **Development Server:** Hot reload with file watching for immediate feedback
5. **Production Build:** Generates optimized, minified files ready for deployment

## Complete Feature Set:
✅ Multi-page Architecture: Automatic page detection and generation
✅ Twig Templating: Full template inheritance with components
✅ Sass/SCSS: Complete preprocessing with organized architecture
✅ Tailwind CSS v4: Latest alpha with custom configuration
✅ Modern JavaScript: ES6+ with Babel transpilation
✅ Asset Optimization: Images, fonts, and file optimization
✅ Development Server: Hot reload with file watching
✅ Production Builds: Minified, optimized output files


## Quick Start:
1. Copy all the files to your project directory
2. Run <code>npm install</code>
3. Run <code>npm run dev</code> for development
4. Run <code>npm run build</code> for production

### The webpack configuration automatically handles:
* Page detection from <code>src/pages/*.twig</code>
* Asset bundling and optimization
* CSS and JS minification
* Content hashing for cache busting
* Source maps for debugging

You can start adding new pages immediately by creating <code>.twig</code> files in the <code>src/pages/</code> directory - they'll automatically be built into corresponding HTML files!
