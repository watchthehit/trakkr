import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter relative inline-block">
        <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-fuchsia-500/30"></span>
        <span className="relative bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 text-transparent bg-clip-text animate-gradient">
          trakkr
        </span>
      </h1>
    </header>
  );
};

export default Header;