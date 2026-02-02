
import React, { useState } from 'react';
import { Product, Order } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onAdd: (p: Product) => void;
  onDelete: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
  onDeleteOrder: (id: string) => void;
  onResetOrders: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  orders, 
  onAdd, 
  onDelete, 
  onUpdateOrderStatus, 
  onDeleteOrder, 
  onResetOrders,
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'stats' | 'orders'>('products');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Real-time calculation from actual orders
  const realRevenue = orders.reduce((acc, o) => acc + (o.status === 'Selesai' ? o.total : 0), 0);
  const realOrderCount = orders.length;
  
  // Combine mock and real for presentation (optional, here we emphasize real data reset)
  const stats = {
    totalRevenue: realRevenue,
    totalOrders: realOrderCount,
    newCustomers: new Set(orders.map(o => o.whatsapp)).size,
    avgOrderValue: realOrderCount > 0 ? realRevenue / realOrderCount : 0,
    weeklySales: [
      { day: 'Sen', value: 0 },
      { day: 'Sel', value: 0 },
      { day: 'Rab', value: 0 },
      { day: 'Kam', value: 0 },
      { day: 'Jum', value: 0 },
      { day: 'Sab', value: 0 },
      { day: 'Min', value: realRevenue },
    ],
    topProducts: orders.length > 0 ? [
      { name: 'Produk Terlaris Saat Ini', sales: orders.length, color: 'bg-primary' }
    ] : []
  };

  const maxSale = Math.max(...stats.weeklySales.map(s => s.value), 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return alert('Lengkapi data produk!');
    onAdd({ id: Date.now().toString(), name, price: parseInt(price), description: desc, image });
    setName(''); setPrice(''); setDesc(''); setImage(null); setIsAddOpen(false);
  };

  const handleConfirmReset = () => {
    if (window.confirm("PERINGATAN: Apakah Anda yakin ingin menghapus SEMUA data pesanan dan meriset statistik? Tindakan ini tidak dapat dibatalkan.")) {
      onResetOrders();
      alert("Statistik telah berhasil diriset.");
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      'Baru': 'bg-blue-100 text-blue-700',
      'Diproses': 'bg-amber-100 text-amber-700',
      'Selesai': 'bg-green-100 text-green-700',
      'Dibatalkan': 'bg-red-100 text-red-700',
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="p-8 flex items-center gap-3 border-b border-gray-800">
          <span className="material-symbols-outlined text-primary">bakery_dining</span>
          <span className="font-black text-xl tracking-tight">Backend</span>
        </div>
        <nav className="p-4 flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Daftar Produk
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            Pesanan Masuk
            {orders.some(o => o.status === 'Baru') && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-auto" />}
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <span className="material-symbols-outlined">analytics</span>
            Statistik Penjualan
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all">
            <span className="material-symbols-outlined">logout</span>
            Keluar Backend
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-grow p-10">
        {activeTab === 'products' && (
          <>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Manajemen Produk</h1>
                <p className="text-gray-500 mt-1">Total {products.length} produk kustom tersimpan.</p>
              </div>
              <button onClick={() => setIsAddOpen(true)} className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                <span className="material-symbols-outlined">add</span>
                Tambah Produk
              </button>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Foto</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Nama & Deskripsi</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-300 font-bold">Belum ada produk kustom.</td></tr>
                  ) : (
                    products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4"><img src={p.image} className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" /></td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-xs">{p.description}</div>
                        </td>
                        <td className="px-6 py-4 font-black text-gray-700">{FORMAT_CURRENCY(p.price)}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => onDelete(p.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
              <h1 className="text-3xl font-black text-gray-900">Pesanan Masuk</h1>
              <p className="text-gray-500 mt-1">Daftar pesanan yang masuk melalui WhatsApp.</p>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Pelanggan</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-300 font-bold">Belum ada pesanan masuk.</td></tr>
                  ) : (
                    orders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold font-mono text-gray-400">{o.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{o.name}</div>
                          <div className="text-xs text-gray-400">{o.whatsapp}</div>
                        </td>
                        <td className="px-6 py-4 font-black text-gray-700">{FORMAT_CURRENCY(o.total)}</td>
                        <td className="px-6 py-4">{getStatusBadge(o.status)}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedOrder(o)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Buka Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Statistik Penjualan</h1>
                <p className="text-gray-500 mt-1">Pantau performa bisnis Di'Sncak-an Anda berdasarkan data riil.</p>
              </div>
              <button 
                onClick={handleConfirmReset}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">history_toggle_off</span>
                Reset Data Penjualan
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Pendapatan', value: FORMAT_CURRENCY(stats.totalRevenue), icon: 'payments', color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Total Pesanan', value: stats.totalOrders, icon: 'shopping_basket', color: 'text-primary', bg: 'bg-orange-50' },
                { label: 'Pelanggan Baru', value: stats.newCustomers, icon: 'group_add', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Rerata Pesanan', value: FORMAT_CURRENCY(stats.avgOrderValue), icon: 'analytics', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-end mb-8">
                  <div><h3 className="text-xl font-bold text-gray-900">Grafik Mingguan (Data Hari Ini)</h3></div>
                </div>
                <div className="flex items-end justify-between h-64 gap-2 pt-4">
                  {stats.weeklySales.map((item, i) => (
                    <div key={i} className="flex-grow flex flex-col items-center gap-3 group">
                      <div className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary/40 rounded-t-xl transition-all duration-500 origin-bottom" style={{ height: `${(item.value / maxSale) * 100}%` }} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Analisis Produk</h3>
                <div className="space-y-6">
                  {stats.topProducts.length > 0 ? stats.topProducts.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold"><span>{item.name}</span><span>{item.sales} Pesanan</span></div>
                      <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `100%` }} />
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-300 font-medium italic">Belum ada data untuk dianalisis.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black">Detail Pesanan</h2>
                <p className="text-xs text-gray-400 font-mono">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined">close</span></button>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Pelanggan</h4>
                <p className="font-bold text-gray-900">{selectedOrder.name}</p>
                <p className="text-sm text-gray-500">{selectedOrder.whatsapp}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Alamat Pengiriman</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedOrder.address}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Produk Pesanan</h4>
              <div className="space-y-3">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold">{item.quantity}x</span>
                      <span className="font-bold text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{FORMAT_CURRENCY(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-500">Total</span>
                <span className="text-xl font-black text-primary">{FORMAT_CURRENCY(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={selectedOrder.status}
                onChange={(e) => onUpdateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                className="flex-grow bg-gray-100 border-none rounded-xl font-bold text-sm px-4"
              >
                <option value="Baru">Status: Baru</option>
                <option value="Diproses">Status: Diproses</option>
                <option value="Selesai">Status: Selesai</option>
                <option value="Dibatalkan">Status: Dibatalkan</option>
              </select>
              <button 
                onClick={() => {
                  onDeleteOrder(selectedOrder.id);
                  setSelectedOrder(null);
                }}
                className="bg-red-50 text-red-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal (unchanged logic) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black mb-6">Produk Baru</h2>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 mb-4">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                {image ? <img src={image} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-4xl text-gray-300">add_a_photo</span>}
              </div>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none text-sm" placeholder="Nama produk..." />
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none text-sm" placeholder="Harga..." />
              <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none text-sm" placeholder="Deskripsi..." rows={3} />
            </div>
            <div className="mt-8 flex gap-3">
              <button type="button" onClick={() => setIsAddOpen(false)} className="flex-grow py-3 rounded-xl font-bold text-gray-400">Batal</button>
              <button type="submit" className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold shadow-lg">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
