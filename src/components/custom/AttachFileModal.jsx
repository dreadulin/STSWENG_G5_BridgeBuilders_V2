import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const AttachFileModal = React.forwardRef(({ isOpen, onClose, onConfirm, title }, ref) => {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); 

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedFile) {
      setErrorMessage(''); 
      onConfirm(selectedFile); 
      onClose();
    } else {
      setErrorMessage('Please select a .jpg file.'); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') { 
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setErrorMessage('Only JPG files are allowed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg text-bb-violet font-bold mb-4">{title}</h2>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload file</label>
        <input
          className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
          id="file_input"
          type="file"
          onChange={handleFileChange} 
        />
         {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>} 
        <div className="flex justify-end space-x-4 mt-5">
          <Button onClick={onClose} className="mr-2 bg-bb-violet">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-bb-violet">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
});

export { AttachFileModal };
