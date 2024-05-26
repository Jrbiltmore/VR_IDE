import React, { useState } from 'react';

const MFA = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle MFA logic
    console.log('MFA code:', code);
  };

  return (
    <div className="mfa">
      <h1>Multi-Factor Authentication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Authentication Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default MFA;
