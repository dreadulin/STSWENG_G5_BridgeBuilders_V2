import { useState, useEffect } from "react";
import axios from "axios";
import Appbar from "@/components/ui/Appbar";
import { Button } from "@/components/ui/button";
import { AttachFileModal } from "@/components/custom/AttachFileModal";
import { PasswordModal } from "@/components/custom/PasswordModal";

const userTypeMapping = {
  superUser: "Super User",
  community: "Community",
  homeCare: "Home Care"
};

const Admin = () => {
  const [accounts, setAccounts] = useState([]);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [messageVisible, setMessageVisible] = useState(false); 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/accounts');
        console.log('Fetched accounts:', response.data);
        if (Array.isArray(response.data)) {
          setAccounts(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleResetPassword = (account) => {
    setSelectedAccount(account);
    setIsResetModalOpen(true);
  };

  const handlePasswordChange = async (newPassword) => {
    if (!selectedAccount || !newPassword) {
      console.error('Selected account or new password is missing');
      return;
    }

    try {
      await axios.post('http://localhost:3002/api/reset-password', {
        username: selectedAccount.username,
        newPassword,
      });
      setSuccessMessage("Password updated successfully!");
      setMessageVisible(true); 
      setIsResetModalOpen(false);
      setNewPassword("");
      setSelectedAccount(null);
      const response = await axios.get('http://localhost:3002/api/accounts');
      if (Array.isArray(response.data)) {
        setAccounts(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setSuccessMessage(""); 
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setMessageVisible(false); 
        setSuccessMessage(""); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  const handleNewBackground = async (file) => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("backgroundImage", file);
  
    try {
      const response = await axios.post('http://localhost:3002/api/upload-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Background updated:', response.data);
      alert('Background image updated successfully!');
    } catch (error) {
      console.error('Error uploading background image:', error);
      alert('Failed to update background image. Please try again.');
    }
  };
    
  return (
    <>
      <Appbar />

      <div className="bg-white p-6 rounded-lg w-full">
        <h1 className="text-2xl font-bold text-bb-violet mb-4">Admin Dashboard</h1>
        <div className="flex flex-row space-x-4">
          <Button className="bg-bb-violet text-white px-6 py-3 text-lg font-bold">
            <a href="/signup" className="text-white no-underline">
              Signup account
            </a>
          </Button>
          <Button 
            className="bg-bb-violet text-white px-6 py-3 text-lg font-bold"
              onClick={()=>setIsAttachModalOpen(true)}>
              Change Login Background
          </Button>
        </div>
        
      <hr className="my-4 border-t-2 border-bb-violet" />
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-bb-violet text-left text-bb-violet font-bold">Username</th>
              <th className="py-2 px-4 border-b-2 border-bb-violet text-left text-bb-violet font-bold">User Type</th>
              <th className="py-2 px-4 border-b-2 border-bb-violet text-left text-bb-violet font-bold"></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index} className="border-b border-bb-violet hover:bg-gray-100">
                <td className="py-2 px-4 text-bb-violet font-bold">{account.username}</td>
                <td className="py-2 px-4 text-bb-violet font-bold">
                  {userTypeMapping[account.userType] || account.userType}
                </td>
                <td className="py-2 px-4">
                  <Button
                    className="bg-bb-violet text-white"
                    onClick={() => handleResetPassword(account)}
                  >
                    Reset Password
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {successMessage && messageVisible && (
          <div className="mt-4 p-4 bg-green-200 text-green-800 rounded transition-opacity duration-1000 opacity-100">
            {successMessage}
          </div>
        )}
      </div>

      <PasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handlePasswordChange}
        currentUsername={selectedAccount?.username}
      />

      <AttachFileModal
        title={"Change Login Background"}
        isOpen={isAttachModalOpen}
        onClose={() => setIsAttachModalOpen(false)}
        onConfirm={handleNewBackground}
        message={`Attach a File:`}
      />
    </>
  );
};

export default Admin;