// babel.config.js

module.exports = {
  presets: [
    '@babel/preset-env',  // Transpile modern JavaScript to ES5
    '@babel/preset-react' // Transpile JSX and other React-related code
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties', // Enable support for class properties
    '@babel/plugin-syntax-dynamic-import'      // Enable parsing of dynamic imports
  ]
};
