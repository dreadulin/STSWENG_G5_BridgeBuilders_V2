import Appbar from "@/components/ui/Appbar";
import Goal from "@/components/ui/Goal";
import Tooltip from "@/components/ui/Tooltip";
import useProfile from "@/utils/hooks/useProfile";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance.js";
import { jsPDF } from "jspdf";

const Profile = () => {
  const { caseNo } = useParams();

  const { profileData } = useProfile(caseNo);

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
    const logoSize = 30;
    const logoOffset = -15; 
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
    const imgUrl = profileData.picture ?? "/src/assets/logo.png";
    const img = new Image();
    img.src = imgUrl;

    // Wait for the image to load
    img.onload = () => {
        // Add profile picture
        doc.addImage(img, 'JPEG', margin, profileImageYPosition, 70, 70); // Adjust size and position as needed

        // Load and add the company logo
        const logoImg = new Image();
        logoImg.src = "/src/assets/logo.png"; // Company logo path

        logoImg.onload = () => {
            // Calculate position for the logo at the bottom right
            const logoX = doc.internal.pageSize.width - logoSize - margin; // Position on the right
            const logoY = doc.internal.pageSize.height - logoSize - margin - logoOffset; // Position a bit lower at the bottom

            // Add company logo
            doc.addImage(logoImg, 'PNG', logoX, logoY, logoSize, logoSize);

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
                // Split the label and value to apply bold styling to the label
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

        // Handle image load error
        logoImg.onerror = () => {
            console.error("Logo image failed to load.");
        };

        logoImg.src = "/src/assets/logo.png"; // Trigger logo image loading
    };

    // Handle profile picture load error
    img.onerror = () => {
        console.error("Profile picture failed to load.");
    };

    img.src = imgUrl; // Trigger profile picture loading
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
                <strong>Case number:</strong> ${caseNo}
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
                <span 
                  className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer" 
                  onClick={handleDownloadClick}
                >
                  download
                </span>
              </Tooltip>
            </div>

            <h2 className="text-3xl xl:text-5xl">
              Program: {profileData.program}
            </h2>

            <div className="flex items-center mt-12">
              <h1 className="text-4xl mr-4">Intervention</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div>

            <div className="flex w-full overflow-auto">
              <Goal
                name="goal1"
                goalsAchieved={profileData.goalsAchieved}
                image={"/src/assets/logo.png"}
                title="Mental"
                goal={1}
              />
              <Goal
                name="goal2"
                goalsAchieved={profileData.goalsAchieved}
                image={"/src/assets/logo.png"}
                title="Physical/Social"
                goal={2}
              />
              <Goal
                name="goal3"
                goalsAchieved={profileData.goalsAchieved}
                image={"/src/assets/logo.png"}
                title="Support to Caregiver"
                goal={3}
              />
            </div>

            <div className="flex items-center mt-8">
              <h1 className="text-4xl mr-4">More Information</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;