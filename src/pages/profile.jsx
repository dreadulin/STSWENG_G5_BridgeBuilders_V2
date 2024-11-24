import Appbar from "@/components/ui/Appbar";
import Goal from "@/components/ui/Goal";
import Tooltip from "@/components/ui/Tooltip";
import useProfile from "@/utils/hooks/useProfile";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance.js";
import logo2 from "@/assets/logo2.png";
import { jsPDF } from "jspdf";
import { useRef } from "react"; // Import useRef for file input reference
import { useState } from "react";

const Profile = () => {
  const { caseNo } = useParams();
  const { profileData } = useProfile(caseNo);
  const fileInputRef = useRef(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleArchiveClick = async () => {
    console.log("handling archive");
    const confirmArchive = window.confirm(
      "Are you sure you want to archive this profile?"
    );
    if (confirmArchive) {
      try {
        await axios.post(`/api/archiveProfile/${caseNo}`);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      console.log("Archive cancelled");
    }
  };

  const handleDownloadClick = async () => {
    const doc = new jsPDF();
    const margin = 14;
    const lineHeight = 15;
    const titleYPosition = 22;
    const profileImageYPosition = 35; 
    const profileInfoStartY = 122;
    const footerYPosition = doc.internal.pageSize.height - 10;

    // Add a light background color (optional)
    doc.setFillColor(255, 255, 240); // Light gray background
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Add title (centered)
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    const titleWidth = doc.getTextWidth("Profile Information");
    doc.text("Profile Information", (doc.internal.pageSize.width - titleWidth) / 2, titleYPosition);

    // Add the profile picture
    const profilePictureUrl = profileData.picture ?? "/assets/logo.png"; // Renamed for clarity
    const profileImage = new Image();
    profileImage.src = profilePictureUrl;

    profileImage.onload = () => {
      doc.addImage(profileImage, 'JPEG', margin, profileImageYPosition, 70, 70);

      // Draw a line below the title
      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 0, 0); // Black line
      doc.line(margin, 28, doc.internal.pageSize.width - margin, 28); // Horizontal line across the page

      // Add profile information after the image
      doc.setFontSize(12);
      const profileDetails = [
        `Pangalan: ${profileData.pangalan}`,
        `Palayaw: ${profileData.palayaw}`,
        `Edad: ${profileData.edad}`,
        `Kasarian: ${profileData.kasarian}`,
        `Birth Date: ${profileData.birthday}`,
        `Relihiyon: ${profileData.relihiyon}`,
        `Program: ${profileData.program}`,
        `Case number: ${caseNo}`,
      ];

      let y = profileInfoStartY; // Starting y position after the image
      profileDetails.forEach((detail) => {
        const [label, value] = detail.split(": ");
        doc.setFont("Helvetica", "bold");
        doc.text(label + ":", margin, y);
        doc.setFont("Helvetica", "normal");
        doc.text(value, margin + 36, y); 
        y += lineHeight; 
      });

      // Border
      doc.setDrawColor(0); 
      doc.rect(margin - 2, profileInfoStartY - 10, doc.internal.pageSize.width - 2 * margin + 4, y - profileInfoStartY + 5); // Adjust rectangle to fit content

      // Add footer (optional)
      doc.setFont("Helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Generated by BridgeBuilders", margin, footerYPosition);

      // Save the PDF
      doc.save(`${profileData.pangalan}(BridgeBuilders).pdf`);
    };

    profileImage.onerror = () => {
      console.error("Profile picture failed to load.");
    };

    profileImage.src = profilePictureUrl; 
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await axios.post(`/api/profile/${caseNo}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("File uploaded successfully:", response.data);
  
        alert("File uploaded successfully!");
        window.location.reload(); 
      } catch (error) {
        console.error("Error uploading file:", error);
        
        alert("Error uploading file. Please try again.");
      }
    }
  };  

  const handleArchiveFile = async (fileId) => {
    console.log("handling archive file");
    const confirmArchiveFile = window.confirm(
      "Are you sure you want to archive this file?"
    );

    if(confirmArchiveFile) {
      try{
        await axios.post(`/api/archiveFile/${caseNo}/${fileId}`);
      } catch (error) {
        console.error("Error archiving file: ", error);
      }
    } else {
      console.log("Archive Cancelled");
    }
  }; 

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="w-screen h-max md:h-screen bg-white">
        <Appbar />

        <div className="flex flex-col md:flex-row h-max md:h-[calc(100%-10rem)] mt-8 ml-8 mr-8">
          <div className="flex flex-col h-full w-full md:w-3/4 lg:w-1/3 xl:w-1/4 mr-8">
            <div className="w-full h-full md:h-1/2 lg:h-2/3 xl:h-3/6 bg-bb-light-purple flex align-center justify-center self-center">
              <img
                src={profileData.picture ?? "/src/assets/logo.png"}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col mt-4 text-bb-violet">
              <div className="flex items-center mt-4 mb-4">
                <h1 className="text-4xl mr-4">About</h1>
                <div className="flex-grow h-1 bg-bb-violet"></div>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  id_card
                </span>
                <h2>
                  <strong>Palayaw:</strong> {profileData.palayaw}{" "}
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  hourglass_empty
                </span>
                <h2>
                  <strong>Edad:</strong> {profileData.edad}{" "}
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  wc
                </span>
                <h2>
                  <strong>Kasarian:</strong> {profileData.kasarian}{" "}
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  cake
                </span>
                <h2>
                  <strong>Petsa ng Kapanganakan:</strong> {profileData.birthday}{" "}
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  church
                </span>
                <h2>
                  <strong>Relihiyon:</strong> {profileData.relihiyon}{" "}
                </h2>
              </div>

              <div className="flex-grow h-1 mt-4 bg-bb-violet"></div>

              <h3 className="mt-2">
                <strong>Case number:</strong> {caseNo}
              </h3>

              <div className="flex-grow h-1 mt-4 mb-4 bg-bb-violet"></div>
            </div>
          </div>

          <div className="flex flex-col h-full flex-grow overflow-auto z-0 text-bb-violet mr-4 xl:mr-28">
            <div className="flex items-center mb-8">
              <h1 className="text-4xl xl:text-7xl flex-grow">
                {profileData.pangalan}
              </h1>
              <Tooltip tooltipText={"Edit"} className=" mr-6 ml-6 ">
                <a href={`/edit/${caseNo}`}>
                  <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                    edit
                  </span>
                </a>
              </Tooltip>
              <Tooltip tooltipText={"Archive"} className=" mr-6 ml-6 ">
                <a href={`/profile/${caseNo}`} onClick={handleArchiveClick}>
                  <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                    folder_open
                  </span>
                </a>
              </Tooltip>
              <Tooltip tooltipText={"Download"} className=" mr-6 ml-6 ">
                <a onClick={handleDownloadClick}>
                  <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer"> 
                  download
                  </span>
                </a>
              </Tooltip>
            </div>

            <h2 className="text-3xl xl:text-5xl">
              Program: {profileData.program}
            </h2>

            <div className="flex items-center mt-5">
              <h1 className="text-4xl mr-4">Intervention</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div>

            <div className="flex w-full overflow-auto">
            <div className="flex flex-col">
              <Goal
                name="goal1"
                goalsAchieved={profileData.goalsAchieved}
                image={logo2}
                title="Mental"
                goal={1}
              />
              {/* Subgoals List */}
              <div className="mt-4">
                  <h2 className="text-2xl font-semibold mb-2">Subgoals</h2>
                  <div className="border border-gray-300 rounded-lg p-4 bg-light-violet shadow-sm">
                    {profileData.subgoals?.length > 0 ? (
                      <ul className="list-disc pl-8 space-y-2">
                        {profileData.subgoals.map((subgoal, index) => (
                          <li key={index} className="text-lg text-bb-violet">
                            {subgoal}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg text-gray-500">No subgoals added</p>
                    )}
                  </div>
                </div>
              </div>
              <Goal
                name="goal2"
                goalsAchieved={profileData.goalsAchieved}
                image={logo2}
                title="Physical/Social"
                goal={2}
              />
              <Goal
                name="goal3"
                goalsAchieved={profileData.goalsAchieved}
                image={logo2}
                title="Support to Caregiver"
                goal={3}
              />
            </div>

            <div className="flex items-center mt-8">
              <h1 className="text-4xl mr-4">More Information</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div>
            
            <div className="mt-4">
              <button
                className="bg-bb-violet text-white px-4 py-2 rounded-lg"
                onClick={triggerFileInput}
              >
                Import File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileImport}
              />
            </div>

            <div className="mt-4">
            <h3 className="text-xl font-bold">Attached Files</h3>
            <ul className="list-disc pl-5 mt-2">
              {profileData.attachedFiles && profileData.attachedFiles.length > 0 ? (
                profileData.attachedFiles
                .filter((file) => file.fileStatus === "Active")
                .map((file, index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    {/* Make the file name clickable */}
                    <a
                      href={file.filePath} // Assuming filePath is the valid URL for the file
                      target="_blank" // Open in a new tab
                      rel="noopener noreferrer" // Security measure for external links
                      className="text-blue-500 hover:underline"
                    >
                      {file.fileName}
                    </a>

                    <div className="ml-auto flex items-center space-x-2">
                    {/* Archive Button */}
                    <button
                        onClick={() => handleArchiveFile(file._id)} 
                        className="text-blue-600 hover:underline px-2 py-1 border border-blue-600 rounded-lg"
                      >
                        Archive
                      </button>
                      </div>

                    
                  </li>
      ))
    ) : (
      <p>No files attached yet.</p>
    )}
  </ul>
</div>

</div>
          </div>
        </div>
      
    </>
  );
};

export default Profile;
