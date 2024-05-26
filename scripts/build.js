// build.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths
const buildPath = path.resolve(__dirname, 'dist');

// Clean up the build directory
if (fs.existsSync(buildPath)) {
  fs.rmSync(buildPath, { recursive: true, force: true });
  console.log('Cleaned up the build directory.');
}

// Run the Webpack build
exec('npx webpack --config webpack.prod.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Build error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
  console.log('Build completed successfully.');
});
