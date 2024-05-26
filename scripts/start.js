// start.js

const { exec } = require('child_process');

// Run the Webpack development server
exec('npx webpack serve --config webpack.dev.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Development server error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
  console.log('Development server started successfully.');
});
