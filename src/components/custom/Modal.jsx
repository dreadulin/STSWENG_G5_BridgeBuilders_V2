import React from 'react';
import { Button } from "@/components/ui/button";

const Modal = React.forwardRef(({ isOpen, onClose, onConfirm, message }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg text-bb-violet font-bold mb-4">Delete Year</h2>
        <p className="mb-4 text-bb-violet">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} className="mr-2 bg-bb-violet">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-bb-violet">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export { Modal };
