import React from 'react';

export const FullPageContainer = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh', // Using viewport height to cover the full screen
      backgroundImage: 'repeating-radial-gradient(#f8f1f1ee 87%, #3fa7b4 90%)',
      backgroundSize: '50px 50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Your content here */}
      <h1>Hello, world!</h1>
    </div>
  );
};

