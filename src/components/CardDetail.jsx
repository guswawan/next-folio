'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconTool from './../../public/tool.svg';
import IconTrash from './../../public/trash.svg';
import IconGoToArrow from './../../public/goto-arrow.svg';

export const CardDetail = ({ item }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [fullname, setFullname] = useState(item.fullname);
  const [portfolio_url, setPortfolio_url] = useState(item.portfolio_url);
  const [social_account, setsocial_account] = useState(item.social_account);

  async function handleDeleteCard() {
    const res = await fetch('https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([item._id]),
    });
    const data = res.json();
    console.log('DATA SUBMIT', data);

    router.refresh();
  }

  const ArrowIcon = () => (
    <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <path
          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );

  async function handleEditCard() {
    const res = await fetch('https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: item._id,
        fullname,
        portfolio_url: portfolio_url.startsWith('https://')
          ? portfolio_url
          : `https://${portfolio_url}`,
        social_account,
        thumbnail: item.thumbnail,
      }),
    });
    const data = res.json();
    console.log('DATA SUBMIT', data);

    router.refresh();
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="space-x-4 space-y-2">
        {/* <h3>Portfolio Submission</h3> */}
        <input
          type="text"
          placeholder="Type your fullname"
          className="input input-bordered input-secondary w-full max-w-xs"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
        />
        <input
          type="url"
          placeholder="Type your portfolio url"
          className="input input-bordered input-secondary w-full max-w-xs"
          onChange={(e) => setPortfolio_url(e.target.value)}
          value={portfolio_url}
        />
        <input
          type="text"
          placeholder="Type your twitter account"
          className="input input-bordered input-secondary w-full max-w-xs"
          onChange={(e) => setSocial_account(e.target.value)}
          value={social_account}
        />
        <button className="btn btn-secondary" onClick={handleEditCard}>
          Update
        </button>
      </div>
    );
  }

  return (
    <div className="card w-96 glass relative cursor-pointer group items-center overflow-hidden justify-end duration-800">
      <div className=" absolute space-y-2 shadow-md opacity-100 right-2 top-2 rounded-lg p-2">
        <div
          className="opacity-20 hover:opacity-100"
          onClick={() => setEditMode(true)}
        >
          <Image src={IconTool} alt="icon-tool" width={14} />
        </div>
        <div
          className="opacity-20 hover:opacity-100"
          onClick={handleDeleteCard}
        >
          <Image src={IconTrash} alt="icon-trash" width={14} />
        </div>
      </div>
      <figure>
        <Image
          // src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          src={item.thumbnail}
          alt="car!"
          width={500}
          height={500}
        />
      </figure>

      <div className="flex w-full p-4 justify-between translate-x-0 opacity-100 transition group-hover:translate-x-[100%] group-hover:opacity-0">
        <h2 className="card-title text-white">{item.fullname}</h2>
        <div className="hover:absolute hover:-right-8">
          <Image src={IconGoToArrow} alt="goto-arrow" width={32} />
        </div>
      </div>

      <div className="flex w-full p-4 justify-between absolute -translate-x-[100%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 bg-white/10">
        <div className="">
          <Image src={IconGoToArrow} alt="goto-arrow" width={32} />
        </div>
        <h2 className="card-title text-white">{item.fullname}</h2>
        <h2 className="card-title">goto site</h2>
      </div>
    </div>
  );
};
