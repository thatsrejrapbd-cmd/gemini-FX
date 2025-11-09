import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Gemini
        </span>
        <span className="text-gray-300"> Image FX</span>
      </h1>
      <p className="mt-2 md:mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Transform your ideas into stunning visuals with AI. Describe your vision, and let Gemini bring it to life.
      </p>
    </header>
  );
};
