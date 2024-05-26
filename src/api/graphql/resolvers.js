// resolvers.js

const { AuthenticationError, UserInputError } = require('apollo-server-express');

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// Resolver functions
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => {
      const user = users.find(user => user.id === parseInt(id));
      if (!user) {
        throw new UserInputError('User not found');
      }
      return user;
    },
  },
  Mutation: {
    addUser: (parent, { name, email }) => {
      const newUser = {
        id: users.length + 1,
        name,
        email,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, name, email }) => {
      const user = users.find(user => user.id === parseInt(id));
      if (!user) {
        throw new UserInputError('User not found');
      }
      user.name = name;
      user.email = email;
      return user;
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex(user => user.id === parseInt(id));
      if (userIndex === -1) {
        throw new UserInputError('User not found');
      }
      const deletedUser = users.splice(userIndex, 1);
      return deletedUser[0];
    },
  },
};

module.exports = resolvers;
