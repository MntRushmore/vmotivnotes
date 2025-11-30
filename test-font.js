const { createCanvas } = require('canvas');

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Test different fonts
const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'sans-serif', 'serif', 'monospace'];

fonts.forEach(font => {
  try {
    ctx.font = `20px "${font}"`;
    ctx.fillText('Test', 10, 30);
    console.log(`✓ ${font} works`);
  } catch (e) {
    console.log(`✗ ${font} failed:`, e.message);
  }
});
