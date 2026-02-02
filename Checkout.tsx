
import React, { useState } from 'react';
import { CartItem, OrderForm, Order } from '../types';
import { FORMAT_CURRENCY, CONTACT_WHATSAPP } from '../constants';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOrderSuccess: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onUpdateQuantity, onRemoveItem, onOrderSuccess }) => {
  const [form, setForm] = useState<OrderForm>({
    name: '',
    whatsapp: '',
    address: '',
    notes: ''
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSendToWhatsApp = () => {
    if (!form.name || !form.whatsapp || !form.address) {
      alert('Mohon lengkapi detail pengiriman.');
      return;
    }

    // Record order in system
    const newOrder: Order = {
      ...form,
      id: `ORD-${Date.now()}`,
      items: [...items],
      total: subtotal,
      status: 'Baru',
      createdAt: new Date().toISOString()
    };
    onOrderSuccess(newOrder);

    // Build WhatsApp message
    const orderList = items.map(item => `- ${item.name} (${item.quantity}x)`).join('%0A');
    const message = `Halo Di'Sncak-an, saya ingin memesan:%0A%0A${orderList}%0A%0A*Total Estimasi:* ${FORMAT_CURRENCY(subtotal)}%0A%0A*Detail Pengiriman*%0A- Nama: ${form.name}%0A- WhatsApp: ${form.whatsapp}%0A- Alamat: ${form.address}%0A- Catatan: ${form.notes || '-'}`;
    
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <button onClick={onBack} className="hover:text-primary transition-colors">Beranda</button>
        <span>/</span>
        <span className="font-bold text-[#1b160d]">Checkout</span>
      </nav>

      <h1 className="text-4xl font-black text-[#1b160d] mb-4">Checkout Pesanan</h1>
      <p className="text-text-muted mb-12">Lengkapi data diri untuk pesanan snack buatan rumah favoritmu.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-8">Detail Pengiriman</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1b160d]">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1b160d]">Nomor WhatsApp</label>
              <input 
                type="tel" 
                placeholder="Contoh: 081234567890"
                className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all"
                value={form.whatsapp}
                onChange={e => setForm({...form, whatsapp: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1b160d]">Alamat Lengkap</label>
              <textarea 
                rows={4}
                placeholder="Masukkan alamat pengiriman selengkap mungkin..."
                className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1b160d]">Catatan Pesanan (Opsional)</label>
              <input 
                type="text" 
                placeholder="Contoh: Kurangi pedas, titip di satpam, dll."
                className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all"
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>
            <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto mb-6 pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-start group">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-[#1b160d] truncate">{item.name}</h4>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Hapus dari keranjang"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-primary active:scale-90 transition-all text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-primary active:scale-90 transition-all text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm text-primary">{FORMAT_CURRENCY(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-bold">{FORMAT_CURRENCY(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Ongkos Kirim</span>
                <span className="text-xs italic text-text-muted">Dihitung via WA</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-primary text-2xl font-black">{FORMAT_CURRENCY(subtotal)}</span>
              </div>
            </div>

            <button 
              onClick={handleSendToWhatsApp}
              className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">send</span>
              Pesan Sekarang
            </button>
            <p className="text-[10px] text-center text-text-muted mt-4">
              Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
