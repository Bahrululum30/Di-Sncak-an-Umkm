
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bonat',
    description: 'Donat Kentang Empuk dengan taburan gula halus spesial.',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV-HC_nROgqYb78t4lpxKvdq3zF1bWNkfq882xcF6yltsdvmHygt8-6X2DwzKyX-VTA9ar_SEkPd4SlDLVkAaH0OGGakGIet9oyJEe4lusc_52lzfwzCJSDBNeD19TZjekzAn9xZUFONdg-KuRvSyFM719NEQDnXNSL4HJ-DyOgwGY-nPC2TmuWqL5Y8v1cvghMHZ-52zUT_4ez7_2fD5u0B6ypqvrbpOjWCAGzvr2zjKr6MHX1F_32sPG-7GjYpO4ZjX55hX4io4',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Barseng',
    description: 'Bakso Goreng Renyah dengan bumbu rahasia yang gurih.',
    price: 15000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gySdsV08xMygwiteq6w2d1pUKj15OcrMimRNlEY6jWOiSqLBlR3m46IJgsM639lmnxsIbs8NcTHxMsbUoefIh45FViPXGPQ51CZwJPX_6ROi3BszCJH620rEuZRWhcGWktl4XcGMgsjOHlBcJ-RqdcNqhu1zSk14YDs4BsqsUzra7Sb7umZ_MJwxhY7p2q7b3GTwDbVBGLT1AfZ9Vk3mFRFjEdPYOF0Ay-_kkdU3R_lIoOrs5tQq2rcxzRYCs5NONYOoocqkhJY'
  },
  {
    id: '3',
    name: 'Kue Bawang',
    description: 'Kue bawang gurih dengan aroma daun seledri segar.',
    price: 10000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9XCsCiIFBzeNDLG_LzJExfIwKBU-lvK1-B5PFcfIQzR6vUeH7hlc_wumKfvyD5KbOUQtaQFCG0mhf4B2AvvYd8F7gVGdf3S8i7JMA2A2QVdotUidAIWg_DDRwIw1EqUenPx-pepHlxg_qB-2G3D5rlbfY-YYhJ7VhP4wHqj5wzqPqZaueojk_xjUh4uLBQyCrDEgkYatGx4VPPKUtqW3KgxFEA6UshKLrrGgT_X1unUoq7nyoXrfStNTm-WJAO5YV0mRIUNZ6Lxs'
  },
  {
    id: '4',
    name: 'Keripik Tempe',
    description: 'Tempe pilihan iris tipis yang digoreng hingga garing krispi.',
    price: 10000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCathUGd5in42XgoIQwV1o8DJBvda0jXmQfulDqPgf3Gj8ICiCfIJ9MNzJCfBJm-8F05fBHkg7UHXETsgK2q5LSv6DZ7r0yiDwTSOnZe3RBaopN9vRFa7lnE3oc6HDan1PP5s0PqVRXvd6kzq0FqOep0j_uwwE-ND4Y2ltAHc2r8Cjs4fw7UpqKvcLNdpdTRfozorXftcxkB3K3ERORMHP5PlxGMvq1QK_rFL5C7bdVYMpdsYuAJ-trTKFrYXpRyVutVJwrJLgqHSo'
  },
  {
    id: '5',
    name: 'Kacang Asin',
    description: 'Kacang tanah pilihan dengan bumbu bawang putih dan garam.',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMvV7d9e_38cB9RCRG1fnrp2zDJB-_piMQBqDzS2rwik6r46qwdzcJ7PfSrxvWTaeJH8b2amCrFI8PuTU22zyMeasnm9p-mlAMGPZGWcnL_dMnQZwtcQ30wO1U1F8viz4u-jfwIeHGzYUFQdq44UJNBfb_lHsCw3TyfwuCZ8GR75wy19oL-NQDQDvHG20bxv05HE1BEv0JDvXI87Mz9rBmF_8uix5fMc-mQ850oaLMpquH5rEDG5i7JV0Lnn9fM-DkPEWx2qsh1GI'
  }
];

export const FORMAT_CURRENCY = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount).replace('IDR', 'Rp');
};

export const CONTACT_WHATSAPP = '6281911039293';
