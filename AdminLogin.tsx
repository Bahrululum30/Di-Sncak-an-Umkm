
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Password salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Backend Di’Sncak-an</h1>
          <p className="text-gray-500 mt-2">Area khusus pengelolaan toko</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Password Admin</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="Masukkan password..."
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-medium pl-1">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Masuk ke Dashboard
          </button>
        </form>

        <button 
          onClick={onCancel}
          className="w-full mt-4 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
        >
          Kembali ke Toko
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
