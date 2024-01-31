import React from 'react';
import { CreateCard } from './CreateCard';

export const Modal = () => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-4/12 h-screen max-w-5xl">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p> */}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-6">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              {/* <button className="btn">Close</button> */}
              <CreateCard />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
