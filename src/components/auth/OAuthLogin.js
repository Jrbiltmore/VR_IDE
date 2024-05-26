import React from 'react';

const OAuthLogin = () => {
  const handleOAuthLogin = (provider) => {
    // Handle OAuth login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="oauth-login">
      <h1>OAuth Login</h1>
      <button onClick={() => handleOAuthLogin('Google')}>Login with Google</button>
      <button onClick={() => handleOAuthLogin('Facebook')}>Login with Facebook</button>
    </div>
  );
};

export default OAuthLogin;
