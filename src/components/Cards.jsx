import React from 'react';
import { CardDetail } from './CardDetail';

export const Cards = ({ data }) => {
  return (
    <main className="bg-[#0E0E20] flex flex-col items-center pb-10">
      <div className="p-6 w-[90%] text-white text-2xl font-medium">
        All Developers
      </div>
      <div className="grid grid-cols-3 gap-8">
        {data.length !== 0 ? (
          data.map((item) => {
            return <CardDetail key={item._id} item={item} />;
          })
        ) : (
          <h1>Belum ada data</h1>
        )}
      </div>
    </main>
  );
};
