
import React from 'react';
import { CONTACT_WHATSAPP } from '../constants';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const MAPS_LINK = "https://maps.app.goo.gl/3a1MZxUhYkc74Zse7";

  return (
    <footer className="bg-[#f3eee7] px-4 md:px-20 lg:px-40 py-16 mt-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl">bakery_dining</span>
            <h2 className="text-2xl font-extrabold text-[#1b160d]">Di’Sncak-an</h2>
          </div>
          <p className="text-text-muted leading-relaxed">
            Membawa cita rasa rumahan ke setiap gigitan. Camilan kami dibuat dengan kasih sayang dan bahan terbaik untuk menemani hari Anda.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-base">public</span>
            </a>
            <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-base">photo_camera</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold">Lokasi Toko</h3>
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <div>
              <p className="font-bold">Hunyur, Padarincang</p>
              <p className="text-text-muted text-sm mb-4">Serang, Banten</p>
              
              <a 
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full h-32 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center hover:opacity-95 transition-all border border-gray-300 shadow-sm"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative bg-white/90 px-4 py-2 rounded-xl text-[10px] font-bold text-primary flex items-center gap-2 shadow-lg border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">map</span>
                  BUKA DI GOOGLE MAPS
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold">Hubungi Kami</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="material-symbols-outlined text-primary">call</span>
            <span className="font-semibold">+62 819-1103-9293</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="material-symbols-outlined text-primary">mail</span>
            <span className="font-semibold">halo@disncakan.com</span>
          </div>
          <a 
            href={`https://wa.me/${CONTACT_WHATSAPP}`}
            target="_blank"
            className="mt-4 bg-[#25D366] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-md hover:scale-105 transition-transform"
          >
            PESAN VIA WHATSAPP
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-sm">
        <p>© 2024 Di’Sncak-an. Semua Hak Dilindungi.</p>
        <button 
          onClick={onAdminClick}
          className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 transition-opacity"
        >
          <span className="material-symbols-outlined text-xs">lock</span>
          Admin Portal
        </button>
      </div>
    </footer>
  );
};

export default Footer;
