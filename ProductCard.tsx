
import React from 'react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg shadow-primary/20 backdrop-blur-md">
            Best Seller
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <span className="text-primary font-black text-lg">{FORMAT_CURRENCY(product.price)}</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-medium">
          {product.description}
        </p>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full py-3.5 px-4 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white text-gray-900 font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest group/btn"
        >
          <span className="material-symbols-outlined text-lg group-hover/btn:scale-125 transition-transform">add_shopping_cart</span>
          Tambah
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
