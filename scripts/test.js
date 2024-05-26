// test.js

const { exec } = require('child_process');

// Run the Jest tests
exec('npx jest', (err, stdout, stderr) => {
  if (err) {
    console.error(`Test error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
  console.log('Tests completed successfully.');
});
