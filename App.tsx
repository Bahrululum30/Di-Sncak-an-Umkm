
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import ProductCard from './components/ProductCard';
import CartBanner from './components/CartBanner';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { PRODUCTS as DEFAULT_PRODUCTS } from './constants';
import { Product, CartItem, Order } from './types';

type ViewState = 'storefront' | 'checkout' | 'admin_login' | 'admin_dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('storefront');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const menuRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('disncakan_products');
    if (savedProducts) setCustomProducts(JSON.parse(savedProducts));
    const savedOrders = localStorage.getItem('disncakan_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('disncakan_products', JSON.stringify(customProducts));
  }, [customProducts]);

  useEffect(() => {
    localStorage.setItem('disncakan_orders', JSON.stringify(orders));
  }, [orders]);

  const allProducts = [...DEFAULT_PRODUCTS, ...customProducts];

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const handlePlaceOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setView('storefront');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleResetOrders = () => {
    setOrders([]);
    localStorage.removeItem('disncakan_orders');
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (view === 'admin_dashboard') {
    return (
      <AdminDashboard 
        products={customProducts} 
        orders={orders}
        onAdd={(p) => setCustomProducts([...customProducts, p])}
        onDelete={(id) => setCustomProducts(customProducts.filter(p => p.id !== id))}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onResetOrders={handleResetOrders}
        onLogout={() => setView('storefront')}
      />
    );
  }

  if (view === 'admin_login') {
    return <AdminLogin onLogin={() => setView('admin_dashboard')} onCancel={() => setView('storefront')} />;
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col relative selection:bg-primary/30 selection:text-primary">
      <Navbar 
        onGoToHome={() => setView('storefront')}
        onGoToMenu={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onGoToAbout={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onGoToLocation={() => locationRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onOpenAdmin={() => setView('admin_login')}
      />

      <main className="flex-grow">
        {view === 'checkout' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Checkout 
              items={cart} 
              onBack={() => setView('storefront')} 
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              onOrderSuccess={handlePlaceOrder}
            />
          </div>
        ) : (
          <>
            <Hero onCtaClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} />
            
            <section ref={aboutRef} className="px-6 md:px-12 lg:px-24 py-20 bg-white/40 backdrop-blur-sm border-y border-gray-100">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                <FeatureCard icon="eco" title="Bahan Pilihan" description="Bahan berkualitas tinggi dari pasar lokal pilihan." />
                <FeatureCard icon="verified_user" title="Tanpa Pengawet" description="Aman dikonsumsi harian oleh seluruh keluarga." />
                <FeatureCard icon="schedule" title="Dibuat Tiap Hari" description="Menjamin kesegaran maksimal di setiap gigitan." />
              </div>
            </section>

            <section ref={menuRef} className="px-6 md:px-12 lg:px-24 py-24">
              <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-none tracking-tighter">Cemilan Favorit Kami</h2>
                    <p className="text-gray-500 font-medium max-w-[480px]">Pilih cemilan favoritmu dari katalog kami dan pesan langsung melalui WhatsApp dengan sekali klik.</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                    <span className="w-12 h-0.5 bg-primary"></span>
                    Handmade with Love
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
                  {allProducts.map((product, idx) => (
                    <div 
                      key={product.id} 
                      className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        <section ref={locationRef}>
          <Footer onAdminClick={() => setView('admin_login')} />
        </section>
      </main>

      {view === 'storefront' && (
        <CartBanner 
          itemCount={cartItemCount} 
          totalPrice={cartTotalPrice} 
          onCheckout={() => setView('checkout')} 
        />
      )}
    </div>
  );
};

export default App;
