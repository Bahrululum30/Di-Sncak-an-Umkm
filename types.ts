
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderForm {
  name: string;
  whatsapp: string;
  address: string;
  notes: string;
}

export interface Order extends OrderForm {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Baru' | 'Diproses' | 'Selesai' | 'Dibatalkan';
  createdAt: string;
}
