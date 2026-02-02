
import React, { useState } from 'react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface ProductManagerProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
  onDelete: (id: string) => void;
  customProducts: Product[];
}

const ProductManager: React.FC<ProductManagerProps> = ({ onClose, onAdd, onDelete, customProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Mohon isi nama, harga, dan pilih foto produk.');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: parseInt(price),
      description: desc,
      image: image
    };

    onAdd(newProduct);
    // Reset form
    setName('');
    setPrice('');
    setDesc('');
    setImage(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-[#1b160d]">Kelola Foto Produk</h2>
            <p className="text-xs text-text-muted mt-1">Tambahkan foto sendiri ke dalam penyimpanan katalog Anda.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form Section */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Tambah Produk Baru
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Foto Produk</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${image ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-primary/30 bg-gray-50'}`}>
                      {image ? (
                        <img src={image} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-4xl text-gray-300">add_photo_alternate</span>
                          <span className="text-xs font-medium text-gray-500">Klik untuk upload foto Anda</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Nama Produk</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Contoh: Donat Meses"
                      className="px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Harga (Rp)</label>
                    <input 
                      type="number" 
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="Contoh: 15000"
                      className="px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Deskripsi Singkat</label>
                  <textarea 
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Ceritakan sedikit tentang produk ini..."
                    rows={3}
                    className="px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">save</span>
                  SIMPAN KE KATALOG
                </button>
              </form>
            </div>

            {/* List Section */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                Penyimpanan Saya ({customProducts.length})
              </h3>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {customProducts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-xs text-text-muted">Belum ada produk kustom yang disimpan.</p>
                  </div>
                ) : (
                  customProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl group hover:shadow-sm transition-all">
                      <img src={p.image} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-sm truncate">{p.name}</h4>
                        <p className="text-primary font-bold text-xs">{FORMAT_CURRENCY(p.price)}</p>
                      </div>
                      <button 
                        onClick={() => onDelete(p.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
              <p className="text-[10px] text-text-muted italic">
                *Data ini disimpan di memori browser Anda (Local Storage).
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
