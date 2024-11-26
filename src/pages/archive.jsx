import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ToggleButton } from "@/components/custom/ToggleButton";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { MdEditNote, MdDeleteForever, MdEditSquare } from "react-icons/md";
import search from "@/assets/search.png";
import filter from "@/assets/filter.png";
import UserCard from "@/components/custom/UserCard";
import FileCard from "@/components/custom/FileCard"
import Appbar from "@/components/ui/Appbar";
import axios from "../axiosInstance.js";
import { jwtDecode } from "jwt-decode";

const defaultFilters = {
  status: "Deleted",
  edad: "",
  kasarian: "",
};

const Archive = () => {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeYear, setActiveYear] = useState(2018);
  const [editMode, setEditMode] = useState(false);
  const [years, setYears] = useState(["All"]);
  const [deletedUsers, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayFiles, setDisplayFiles] = useState(""); 
  const [deletedFiles, setFiles] = useState([]);

  const fetchData = async (searchQuery) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      let edadFilter = {};
      if (filters.edad) {
        const [minAge, maxAge] = filters.edad.split("-").map(Number);
        edadFilter = {
          minAge,
          maxAge,
        };
      }

      const response = await axios.get("/api/archive", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          program: activeCategory,
          year: activeYear,
          search: searchQuery,
          edad: filters.edad,
          kasarian: filters.kasarian,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFiles = async (filters) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      let edadFilter = {};
      if (filters.edad) {
        const [minAge, maxAge] = filters.edad.split("-").map(Number);
        edadFilter = {
          minAge,
          maxAge,
        };
      }
  
      const response = await axios.get("/api/archivedFiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          program: activeCategory,  
          year: activeYear,        
          edad: filters.edad,      
          kasarian: filters.kasarian, 
        },
      });
      setFiles(response.data); 
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "/api/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const user = response.data;
          setUsername(user.username);
          setUserType(user.userType);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;
        const userType = decodedToken.userType;

        console.log("Decoded Username:", username);
        console.log("Decoded UserType:", userType);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    if (userType === "superUser" || userType === "homeCare") {
      setActiveCategory("Home Care");
    } else if (userType === "community") {
      setActiveCategory("Community Based Program");
    }

    setActiveYear(2018);

    if (sessionStorage.getItem("fromLogin") === "true") {
      setShowWelcomeMessage(true);
      sessionStorage.removeItem("fromLogin");

      const audio = new Audio(welcome);
      audio.play();

      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }

    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [userType]);

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (!displayFiles) {
      fetchData(searchQuery);
    } else {
      fetchFiles( filters); 
    }
  }, [activeCategory, activeYear, filters, searchQuery, displayFiles]);

  //Fetch functions
  const fetchYears = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get("/api/years", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch years");
      }
      setYears([...response.data]);
    } catch (error) {
      console.error("Failed to fetch years:", error);
    }
  };

  const handleArchiveFile = async (caseNo, fileId) => {
    console.log("Handling unarchive file");
  
    const confirmUnarchiveFile = window.confirm(
      "Are you sure you want to unarchive this file?"
    );
  
    if (confirmUnarchiveFile) {
      try {
        await axios.post(`/api/archiveFile/${caseNo}/${fileId}`);
        console.log("File unarchived successfully");
      } catch (error) {
        console.error("Error unarchiving file: ", error);
      }
    } else {
      console.log("Unarchive Cancelled");
    }
  };
  
  //Handler functions
  const handleCategoryToggle = (category) => {
    setActiveCategory(category);
  };

  const handleYearToggle = (year) => {
    setActiveYear(year);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleFilterChange = (event) => {
    const { id, value } = event.target;
    setFilters({
      ...filters,
      [id]: value,
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDisplayFiles = () => {
    setDisplayFiles((prev) => !prev);
  };

  return (
    <>
      <Appbar />
      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <h1 className="header">Archive</h1>
          
          {/* Button for Profile/File */}
          <Button 
            className="bg-bb-violet text-white" 
            size="lg" 
            onClick={toggleDisplayFiles}
          >
            {displayFiles ? "Attached Files" : "User Profiles"}
          </Button>
        </div>

        <hr className="my-4 border-t-2 border-bb-violet" />
        {/* Tabs */}
        <div className="mb-2 text-lg font-bold text-bb-violet">Category:</div>
        <div className="flex space-x-4 mb-4">
          {userType === "superUser" && (
            <>
              <ToggleButton
                category="Home Care"
                isActive={activeCategory === "Home Care"}
                onClick={() => handleCategoryToggle("Home Care")}
              >
                Home Care
              </ToggleButton>
              <ToggleButton
                category="Community"
                isActive={activeCategory === "Community Based Program"}
                onClick={() => handleCategoryToggle("Community Based Program")}
              >
                Community
              </ToggleButton>
            </>
          )}
          {userType === "homeCare" && (
            <ToggleButton
              category="Home Care"
              isActive={true}
              onClick={() => handleCategoryToggle("Home Care")}
            >
              Home Care
            </ToggleButton>
          )}
          {userType === "community" && (
            <ToggleButton
              category="Community"
              isActive={true}
              onClick={() => handleCategoryToggle("Community Based Program")}
            >
              Community
            </ToggleButton>
          )}
          {userType === "superUser" && (
            <Popover>
              <PopoverTrigger as="div" className="relative">
                <Button className="bg-bb-violet text-white">
                  <MdEditNote className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white shadow-md rounded">
                <div className="flex items-center space-x-4">
                  <Button
                    className="bg-pink-300 text-white"
                    onClick={handleEditClick}
                  >
                    <p className="text-white font-bold">Edit</p>
                  </Button>
                  <Button
                    className="bg-pink-300 text-white"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <p className="text-white font-bold">Add</p>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Year Filters */}
        <div className="mb-2 text-lg font-bold text-bb-violet">Years:</div>
        <div className="flex flex-wrap mb-4">
          {years.map((year) => (
            <div key={year} className="relative mr-4 mb-2">
              <ToggleButton
                category={year}
                isActive={year === activeYear}
                onClick={() => handleYearToggle(year)}
              />
            </div>
          ))}
        </div>

     

        <hr className="my-4 border-t-2 border-bb-violet" />

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-4 w-1/5 items-center">
          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
              style={{ paddingLeft: "2.5rem" }}
            />
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            />
          </div>
          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger as="div" className="relative flex items-center">
              <Button className="bg-bb-violet text-white pl-10" size="lg">
                Filter
              </Button>
              <img
                src={filter}
                alt="Filter Icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white shadow-md rounded max-w-md border border-pink-300 border-2">
              <div className="flex flex-col space-y-4">
                {/* Age Range Filter */}
                <div className="flex flex-col">
                  <label
                    htmlFor="ageRangeFilter"
                    className="text-sm text-bb-violet"
                  >
                    Age Range:
                  </label>
                  <select
                    id="edad"
                    className="mt-1 p-2 border border-gray-300 rounded text-bb-violet"
                    onChange={handleFilterChange}
                    value={filters.edad}
                  >
                    <option value="">--Select--</option>
                    <option value="">All</option>
                    <option value="5-10">5-10</option>
                    <option value="11-17">11-17</option>
                    <option value="18-24">18-24</option>
                    <option value="25-39">25-39</option>
                    <option value="40-59">40-59</option>
                  </select>
                </div>
                {/* Gender Filter */}
                <div className="flex flex-col">
                  <label
                    htmlFor="genderFilter"
                    className="text-sm text-bb-violet"
                  >
                    Gender:
                  </label>

                  <select
                    id="kasarian"
                    className="mt-1 p-2 border border-gray-300 rounded text-bb-violet"
                    onChange={handleFilterChange}
                    value={filters.kasarian}
                  >
                    <option value="">--Select--</option>
                    <option value="">All</option>
                    <option value="Lalaki">Lalaki</option>
                    <option value="Babae">Babae</option>
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Display Profile List or File List */}
        {!displayFiles ? (
          <div className="space-y-4">
            {deletedUsers.map((user, index) => (
              <UserCard
                key={index}
                name={user.pangalan}
                ageRange={user.edad}
                gender={user.kasarian}
                year={user.yearAdmitted}
                category={user.program}
                profileLink={`/profile/${user._id}`}
                avatar={user.picture}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {deletedFiles.map((file, index) => {
              console.log('File:', file);  // Check if file has the required properties
              return (
                <FileCard
                  key={index}
                  fileName={file.fileName}
                  fileType={file.fileType}
                  uploadDate={new Date(file.uploadDate).toLocaleDateString()}
                  caseNo={file.caseNo}
                  fileId={file.fileId}
                  pangalan={file.pangalan}
                  edad={file.edad}
                  kasarian={file.kasarian}
                  onUnarchive={() => handleArchiveFile(file.caseNo, file._id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Archive;
