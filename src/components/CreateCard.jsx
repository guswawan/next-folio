'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const CreateCard = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [portfolio_url, setPortfolio_url] = useState('');
  const [social_account, setSocial_account] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [_, setLoading] = useState(false);

  async function uploadImageToCloudinary(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'xmncqgxf');

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
    setLoading(true);
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

    setFullname('');
    setPortfolio_url('');
    setSocial_account('');

    router.refresh();
    setLoading(false);

    toast.success('Data added successfully!');
  }

  return (
    <div className="grid grid-cols-1 gap-8 m-auto max-w-xs p-2">
      <h2 className="mb-3 font-semibold text-2xl m-auto">
        Portfolio Submission
      </h2>
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
      <button
        className="btn btn-primary mt-8 disabled:cursor-wait"
        onClick={handleCreateNewCard}
      >
        Submit
      </button>
    </div>
  );
};
