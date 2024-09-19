import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddGoalModal = ({ isOpen, onClose, onConfirm }) => {
  const [category, setCategory] = useState('');
  const [numberOfClients, setNumberOfClients] = useState('');

  const handleConfirm = () => {
    if (category && numberOfClients) {
      onConfirm(category, numberOfClients);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4 text-bb-violet">Add Goal</h2>
        <div className="flex flex-col space-y-4">
          <label htmlFor="category" className="text-bb-violet"><b>What category do you want to put in this goal:</b></label>
          <Input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 text-bb-violet"
          />
          <label htmlFor="numberOfClients" className="text-bb-violet"><b>How many clients:</b></label>
          <Input
            id="numberOfClients"
            type="number"
            value={numberOfClients}
            onChange={(e) => setNumberOfClients(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 text-bb-violet"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mr-2 bg-bb-violet" onClick={onClose}>Cancel</Button>
          <Button className="bg-bb-violet" onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export { AddGoalModal };

