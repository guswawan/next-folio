import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Image from 'next/image';
import { CardDetail } from './CardDetail';

export const Cards = ({ data }) => {
  console.log(data.length);
  return (
    <main className="bg-[#0E0E20] flex flex-col items-center">
      <div className="p-6 w-[90%] text-white text-2xl font-medium">
        All Developers
      </div>
      <div className="grid grid-cols-3 gap-8">
        {/* <Header /> */}

        {data.length !== 0 ? (
          data.map((item) => {
            return <CardDetail key={item._id} item={item} />;
          })
        ) : (
          <h1>Belum ada data</h1>
        )}

        {/* <Footer /> */}
      </div>
    </main>
  );
};
