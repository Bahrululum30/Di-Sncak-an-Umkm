
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Cemilan Premium Serang</span>
            </div>
            <h1 className="text-gray-900 text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Cita Rasa <br />
              <span className="text-primary italic">Rumahan.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-[540px]">
              Nikmati kelezatan camilan buatan tangan yang segar, higienis, dan tanpa pengawet. Hadir menemani setiap momen spesial Anda.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <button 
              onClick={onCtaClick}
              className="group w-full sm:w-auto bg-primary text-white text-lg font-black py-5 px-12 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              LIHAT MENU
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-gray-900 font-black text-sm uppercase tracking-tighter">Hunyur, Padarincang</span>
              <span className="text-primary font-bold text-sm tracking-tight">+62 819-1103-9293</span>
            </div>
          </div>
        </div>

        <div className="relative order-first lg:order-last animate-in fade-in zoom-in duration-1000">
          <div className="absolute -inset-4 bg-primary/5 rounded-[40px] rotate-3 blur-2xl"></div>
          <div 
            className="relative aspect-square lg:aspect-[4/5] rounded-[32px] bg-cover bg-center shadow-2xl z-10 border-8 border-white group overflow-hidden"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnyVwmTePgwaDvEHNq1XRyFuZ71_bmhpkkhEuoEVqps_FZZOy7mEcE84IX05DTtamXYqMNbh_Rs3-DYDiDMlvWC8R2ImUwFl3irYcbEumQ4eIiYcio43klC7I1ilv4OMe1wCpcXe7ctAuBV3NMWgjE5FgHQUFnNaskGXAGyWi1eqcP6Gar_3Ra4r0tC5miDNSTBhUBiQ5R2qfqhya3jImP1e5sc-jdo9DMGXThKr-fRSKYB28QKTWyWl7s3ryuzuOMnu46yftweJo")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
