import React from 'react';
import { CreateCard } from './CreateCard';

export const Modal = () => {
  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-4/12 h-screen max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-6">
            <form method="dialog">
              <CreateCard />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
