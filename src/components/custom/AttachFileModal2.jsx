import React, { useRef, useState } from "react";
import Appbar from "@/components/ui/Appbar";
import Goal from "@/components/ui/Goal";
import Tooltip from "@/components/ui/Tooltip";
import useProfile from "@/utils/hooks/useProfile";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance.js";
import logo2 from "@/assets/logo2.png";
import { jsPDF } from "jspdf";
import FileModal from "@/components/ui/FileModal"; // Import FileModal

const Profile = () => {
  const { caseNo } = useParams();
  const { profileData } = useProfile(caseNo);
  const fileInputRef = useRef(null);

  // State to manage attached files and modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handleArchiveClick = async () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`Profile Archive - ${profileData.name}`, 10, 10);
    
    // Profile Information
    doc.setFontSize(12);
    doc.text(`Case Number: ${caseNo}`, 10, 20);
    doc.text(`Name: ${profileData.name}`, 10, 30);
    doc.text(`Email: ${profileData.email}`, 10, 40);
    // Add more profile details here if necessary
    
    // Generate PDF
    doc.save(`Profile_Archive_${caseNo}.pdf`);
  };

  const handleDownload = (fileUrl, fileName) => {
    // Create an invisible anchor tag to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;  // The URL of the file
    link.download = fileName;  // The name the file should be saved as
    document.body.appendChild(link);  // Append the link to the body
    link.click();  // Trigger the download
    document.body.removeChild(link);  // Clean up by removing the link
  };
  
  const handleFileImport = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    console.log("Selected file:", file); // Log file details
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file); // Append the file to FormData

        // Send the file to the backend
        const response = await axios.post(`/api/profile/${caseNo}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
        // Add the uploaded file to the attachedFiles state
        setAttachedFiles((prevFiles) => [
          ...prevFiles,
          { name: file.name, url: response.data.fileUrl },
        ]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const triggerFileInput = () => {
    console.log("Button clicked, opening file dialog...");
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-screen h-max md:h-screen bg-white">
        <Appbar />
        <div className="flex flex-col md:flex-row h-max md:h-[calc(100%-10rem)] mt-8 ml-8 mr-8">
          {/* existing code */}
          <div className="mt-4">
            <button
              className="bg-bb-violet text-white px-4 py-2 rounded-lg"
              onClick={triggerFileInput} // Open file explorer on button click
            >
              Import File
            </button>
            <button
              className="ml-4 bg-bb-light-purple text-bb-violet px-4 py-2 rounded-lg"
              onClick={openModal} // Open the file modal
            >
              View Attached Files
            </button>
            <button
              className="ml-4 bg-bb-green text-white px-4 py-2 rounded-lg"
              onClick={handleArchiveClick} // Archive the profile as PDF
            >
              Archive Profile
            </button>
            <button
              className="ml-4 bg-bb-light-blue text-white px-4 py-2 rounded-lg"
              onClick={handleDownloadClick} // Download profile data
            >
              Download Profile Data
            </button>
            <input
              type="file"
              ref={fileInputRef} // Hidden file input
              style={{ display: "none" }}
              onChange={handleFileImport} // Handle file import when a file is selected
            />
          </div>
        </div>
      </div>

      {/* Modal for attached files */}
      <FileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        files={attachedFiles}
      />
    </>
  );
};

export default Profile;
