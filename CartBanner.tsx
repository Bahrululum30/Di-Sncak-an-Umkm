
import React from 'react';
import { FORMAT_CURRENCY } from '../constants';

interface CartBannerProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartBanner: React.FC<CartBannerProps> = ({ itemCount, totalPrice, onCheckout }) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-40">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-primary/10 p-3 md:p-4 flex items-center justify-between gap-3">
        {/* Info Section */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {itemCount}
            </span>
            <h3 className="text-sm font-bold text-[#1b160d] truncate">Pesanan Anda</h3>
          </div>
          <p className="hidden sm:block text-text-muted text-[10px] leading-tight mt-0.5">
            Klik checkout untuk pesan via WhatsApp.
          </p>
        </div>
        
        {/* Action Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <span className="text-[9px] font-bold text-text-muted block uppercase tracking-tighter leading-none mb-1">Total</span>
            <span className="text-primary text-xl font-black leading-none">{FORMAT_CURRENCY(totalPrice)}</span>
          </div>
          
          <button 
            onClick={onCheckout}
            className="bg-primary text-white py-2.5 px-5 rounded-lg text-sm font-black shadow-md shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95"
          >
            CHECKOUT
            <span className="material-symbols-outlined text-sm">shopping_cart_checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBanner;
