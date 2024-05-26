// api.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  // Define a simple route
  app.get('/', (req, res) => {
    res.send('Welcome to the VR IDE API');
  });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
