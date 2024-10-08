import React from 'react';
import { Button } from "@/components/ui/button";

const AttachFileModal = React.forwardRef(({ isOpen, onClose, onConfirm }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg text-bb-violet font-bold mb-4">Attach File</h2>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
        <div className="flex justify-end space-x-4 mt-5">
          <Button onClick={onClose} className="mr-2 bg-bb-violet">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-bb-violet">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
});

export { AttachFileModal };
