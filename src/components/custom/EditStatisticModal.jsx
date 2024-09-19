import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditStatisticModal = ({ isOpen, onClose, onConfirm, currentLabel, currentValue }) => {
  const [newLabel, setNewLabel] = useState(currentLabel);
  const [newValue, setNewValue] = useState(currentValue);

  useEffect(() => {
    setNewLabel(currentLabel);
    setNewValue(currentValue);
  }, [currentLabel, currentValue]);

  const handleConfirm = () => {
    if (newLabel !== '' && newValue !== '') {
      onConfirm(newLabel, newValue);
    } else {
      onClose(); // Close the modal if either field is empty
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4 text-bb-violet">Edit Label and Value</h2>
        <div className="flex flex-col space-y-4">
          <label htmlFor="newLabel" className="text-bb-violet"><b>Edit label name:</b></label>
          <Input
            id="newLabel"
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 text-bb-violet"
          />
          <label htmlFor="newValue" className="text-bb-violet"><b>Edit value to:</b></label>
          <Input
            id="newValue"
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
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

export { EditStatisticModal };