
import React from 'react';

interface NavbarProps {
  onGoToHome: () => void;
  onGoToMenu: () => void;
  onGoToAbout: () => void;
  onGoToLocation: () => void;
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGoToHome, onGoToMenu, onGoToAbout, onGoToLocation, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 px-6 md:px-12 lg:px-24 py-3 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform"
          onClick={onGoToHome}
        >
          <div className="bg-primary text-white p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
            <span className="material-symbols-outlined text-2xl block">bakery_dining</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
            Di’Sncak-an
          </h1>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          {['Produk', 'Tentang Kami', 'Lokasi'].map((item, idx) => (
            <button 
              key={item}
              onClick={idx === 0 ? onGoToMenu : idx === 1 ? onGoToAbout : onGoToLocation}
              className="text-sm font-bold text-gray-600 hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onGoToMenu}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-xs font-black shadow-xl shadow-black/10 hover:bg-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            Pesan
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
