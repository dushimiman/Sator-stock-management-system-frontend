// src/components/Layout.js
import React from 'react';
import NavigationBar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
