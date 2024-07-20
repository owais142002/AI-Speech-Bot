// src/components/Loader.js
import React from 'react';
import './Loader.css'; // Import custom CSS for the loader

const Loader = () => {
  return (
    <div className="bars-loader mt-16">
      <div className="bar bg-teal-500"></div>
      <div className="bar bg-teal-500"></div>
      <div className="bar bg-teal-500"></div>
    </div>
  );
};

export default Loader;
