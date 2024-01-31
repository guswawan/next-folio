'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import fetch from 'node-fetch';

export const CreateCard = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [portfolio_url, setPortfolio_url] = useState('');
  const [social_account, setSocial_account] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // async function handleCreateNewCard() {
  //   try {
  //     // Unggah file gambar ke Cloudinary
  //     const cloudinaryResponse = await uploadImageToCloudinary(thumbnail);
  //     if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
  //       console.error('Gagal mengunggah gambar ke Cloudinary');
  //       return;
  //     }

  //     // Dapatkan URL gambar dari respons Cloudinary
  //     const imageUrl = cloudinaryResponse.secure_url;

  //     // Buat objek FormData untuk dikirim ke appbackend.io
  //     const formData = new FormData();
  //     formData.append('fullname', fullname);
  //     formData.append(
  //       'portfolio_url',
  //       portfolio_url.startsWith('https://')
  //         ? portfolio_url
  //         : `https://${portfolio_url}`
  //     );
  //     formData.append('social_account', social_account);
  //     formData.append('thumbnail', imageUrl); // Gunakan URL gambar dari Cloudinary

  //     // Kirim permintaan POST ke appbackend.io
  //     const response = await fetch(
  //       'https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('DATA SUBMIT', responseData);
  //       // Reset nilai input setelah pengiriman berhasil
  //       setFullname('');
  //       setPortfolio_url('');
  //       setSocial_account('');
  //       // Refresh halaman
  //       router.refresh();
  //     } else {
  //       console.error('Gagal melakukan POST:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Terjadi kesalahan:', error);
  //   }
  // }

  async function uploadImageToCloudinary(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'xmncqgxf'); // Ganti dengan upload preset Anda

    const cloudinaryResponse = await fetch(
      'https://api.cloudinary.com/v1_1/asdfghj/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (cloudinaryResponse.ok) {
      return await cloudinaryResponse.json();
    } else {
      throw new Error('Gagal mengunggah gambar ke Cloudinary');
    }
  }

  async function handleCreateNewCard() {
    const cloudinaryResponse = await uploadImageToCloudinary(thumbnail);
    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      console.error('Gagal mengunggah gambar ke Cloudinary');
      return;
    }

    // Dapatkan URL gambar dari respons Cloudinary
    const imageUrl = cloudinaryResponse.secure_url;

    const res = await fetch('https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          fullname,
          portfolio_url: portfolio_url.startsWith('https://')
            ? portfolio_url
            : `https://${portfolio_url}`,
          social_account,
          thumbnail: imageUrl,
        },
      ]),
    });
    const data = res.json();
    console.log('DATA SUBMIT', data);
    setFullname('');
    setPortfolio_url('');
    setSocial_account('');
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-8 m-auto max-w-xs p-2">
      <h2 className="mb-4">Portfolio Submission</h2>
      <input
        type="text"
        placeholder="Type your fullname"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={(e) => setFullname(e.target.value)}
        value={fullname}
      />
      <div className="flex items-center gap-1 input input-bordered input-primary w-full max-w-xs">
        <div>https://</div>
        <input
          type="text"
          placeholder="Type your portfolio url"
          className="bg-inherit"
          onChange={(e) => setPortfolio_url(e.target.value)}
          value={portfolio_url}
        />
      </div>
      <input
        type="text"
        placeholder="Type your twitter account"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={(e) => setSocial_account(e.target.value)}
        value={social_account}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
      <button className="btn btn-primary mt-8" onClick={handleCreateNewCard}>
        Submit
      </button>
    </div>
  );
};
