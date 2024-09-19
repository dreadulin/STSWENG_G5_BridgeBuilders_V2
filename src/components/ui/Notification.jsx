import React, { forwardRef } from 'react';

const Notification = forwardRef(({ message, onClose }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white text-bb-violet p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="font-bold">Notice:</p>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-bb-violet text-white px-4 py-1 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
});

export { Notification };
