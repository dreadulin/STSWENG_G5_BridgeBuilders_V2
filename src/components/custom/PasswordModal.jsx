import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordModal = ({ isOpen, onClose, onConfirm, currentUsername }) => {
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setNewPassword("");
  }, [isOpen]);

  const handleConfirm = () => {
    if (newPassword === '') {
      console.error('New password is empty');
      return;
    }

    console.log('Attempting to confirm password change');
    try {
      onConfirm(newPassword); 
    } catch (error) {
      console.error("Error in handleConfirm:", error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4 text-bb-violet">Reset Password for {currentUsername}</h2>
        <div className="flex flex-col space-y-4">
          <label htmlFor="newPassword" className="text-bb-violet"><b>New Password:</b></label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

export { PasswordModal };
