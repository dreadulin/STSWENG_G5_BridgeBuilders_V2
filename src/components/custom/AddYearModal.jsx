import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

const AddYearModal = ({ isOpen, onClose, onConfirm, onChange = () => {} }) => {
  const [newYear, setNewYear] = useState('');

  const handleInputChange = (e) => {
    const year = e.target.value;
    setNewYear(year);
    onChange(year);
  };

  const handleConfirm = () => {
    onConfirm(newYear);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-bb-violet">Please enter the year to add:</h2>
        <Input
          type="text"
          value={newYear}
          onChange={handleInputChange}
          placeholder="Enter year..."
          className="border border-gray-300 p-2 rounded text-bb-violet"
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleConfirm} className="bg-bb-violet text-white px-4 py-2 rounded">
            Confirm
          </Button>
          <Button onClick={onClose} className="bg-bb-violet text-white px-4 py-2 rounded ml-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AddYearModal };
