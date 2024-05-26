const AuthService = {
  login: (email, password) => {
    // Handle login logic
    console.log('Logging in with', email, password);
  },
  logout: () => {
    // Handle logout logic
    console.log('Logging out');
  },
  register: (email, password) => {
    // Handle registration logic
    console.log('Registering with', email, password);
  }
};

export default AuthService;
