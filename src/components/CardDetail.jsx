'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconTool from './../../public/tool.svg';
import IconTrash from './../../public/trash.svg';
import IconGoToArrow from './../../public/goto-arrow.svg';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const CardDetail = ({ item }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [fullname, setFullname] = useState(item.fullname);
  const [portfolio_url, setPortfolio_url] = useState(item.portfolio_url);
  const [social_account, setSocial_account] = useState(item.social_account);

  async function handleDeleteCard() {
    const res = await fetch('https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([item._id]),
    });
    const data = res.json();

    router.refresh();
    toast.success('Successful removal!');
  }

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

    router.refresh();
    setEditMode(false);
    toast.success('Successfully update!');
  }

  if (editMode) {
    return (
      <div className="flex flex-col items-center gap-4">
        {/* <h3>Portfolio Submission</h3> */}
        <input
          type="text"
          placeholder="Type your fullname"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
        />
        <input
          type="text"
          placeholder="Type your portfolio url"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setPortfolio_url(e.target.value)}
          value={portfolio_url}
        />
        <input
          type="text"
          placeholder="Type your twitter account"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setSocial_account(e.target.value)}
          value={social_account}
        />
        <button className="btn" onClick={handleEditCard}>
          Update
        </button>
      </div>
    );
  }

  return (
    <div className="card w-96 glass relative cursor-pointer group items-center overflow-hidden justify-end duration-800 w-[380px] h-[278px]">
      <div className=" absolute space-y-2 shadow-md opacity-100 right-2 top-2 rounded-lg p-2">
        <div
          className="opacity-20 hover:opacity-100 btn-ghost"
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
      <Link href={item.portfolio_url} target="_blank">
        <figure>
          <Image src={item.thumbnail} alt="car!" width={500} height={500} />
        </figure>
      </Link>
      <div className="flex w-full p-4 justify-between translate-x-0 opacity-100 transition group-hover:translate-x-[100%] group-hover:opacity-0">
        <h2 className="card-title text-white">{item.fullname}</h2>
        <div className="hover:absolute hover:-right-8">
          <Image src={IconGoToArrow} alt="goto-arrow" width={40} />
        </div>
      </div>
      <div className="flex w-full p-4 justify-between absolute -translate-x-[100%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 bg-white/10">
        <div className="">
          <Image src={IconGoToArrow} alt="goto-arrow" width={40} />
        </div>
        <h2 className="card-title text-white">{item.fullname}</h2>
        <h2 className="card-title text-[12px] font-normal tracking-wider">
          Go to site
        </h2>
      </div>
    </div>
  );
};
