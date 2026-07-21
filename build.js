const fs = require('fs');
const path = require('path');

console.log('🔨 Building Samodeda ERP...');

// Read the source HTML file
const sourceFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(sourceFile, 'utf8');

// Add build information
const buildInfo = `
<!-- ============================================= -->
<!-- Build Information                            -->
<!-- Date: ${new Date().toISOString()}             -->
<!-- Commit: ${process.env.GITHUB_SHA || 'local'}  -->
<!-- Branch: ${process.env.GITHUB_REF_NAME || 'local'} -->
<!-- ============================================= -->
`;
html = html.replace('<head>', `<head>\n${buildInfo}`);

// Optimize: Remove CSS comments
html = html.replace(/\/\*[\s\S]*?\*\//g, '');

// Optimize whitespace
html = html.replace(/\s{2,}/g, ' ');

// Remove unnecessary whitespace between tags
html = html.replace(/>\s+</g, '><');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Write to dist
fs.writeFileSync(path.join(distDir, 'index.html'), html);

console.log('✅ Build complete!');
console.log(`📁 Output: dist/index.html`);
console.log(`📊 File size: ${(html.length / 1024).toFixed(2)} KB`);
console.log(`📈 Lines of code: ${html.split('\n').length}`);
