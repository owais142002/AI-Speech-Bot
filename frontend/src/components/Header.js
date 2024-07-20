// src/components/Header.js
import React from 'react';

const Header = () => (
  <div className="text-center p-4 mt-16">
    <h1 className="text-8xl font-extralight mb-2 subpixel-antialiased text-yellow-100 text-pretty" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      Ask me anything about Garnier recent shampoo and conditioners
    </h1>
    <h2 className="text-2xl font-thin subpixel-antialiased text-yellow-100 mt-16" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      Touch the microphone to start conversation
    </h2>
  </div>
);

export default Header;
