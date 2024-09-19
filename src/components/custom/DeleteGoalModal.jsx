import React from 'react';
import { Button } from "@/components/ui/button";

const DeleteGoalModal = ({ isOpen, onClose, onConfirm, message }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg text-bb-violet font-bold mb-4">Delete Goal</h2>
        <p className="text-bb-violet mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button className="mr-2 bg-bb-violet" onClick={onClose}>Cancel</Button>
          <Button className="bg-bb-violet" onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export { DeleteGoalModal };
