import { useState, useEffect } from "react";
import StatisticCard from "@/components/custom/StatisticCard";
import { Input } from "@/components/ui/input";
import { ToggleButton } from "@/components/custom/ToggleButton";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { MdEditNote, MdDeleteForever, MdEditSquare } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import search from "@/assets/search.png";
import filter from "@/assets/filter.png";
import UserCard from "@/components/custom/UserCard";
import { Modal } from "@/components/custom/Modal";
import { AddYearModal } from "@/components/custom/AddYearModal";
import { AddGoalModal } from "@/components/custom/AddGoalModal.jsx";
import { EditStatisticModal } from "@/components/custom/EditStatisticModal.jsx";
import { DeleteGoalModal } from "@/components/custom/DeleteGoalModal";
import Appbar from "@/components/ui/Appbar";
import welcome from "@/assets/welcome.mp3";
import axios from "../axiosInstance.js";
import { jwtDecode } from "jwt-decode";

const defaultFilters = {
  status: "Active",
  edad: "",
  kasarian: "",
};

const Overview = () => {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeYear, setActiveYear] = useState(2018);
  const [editMode, setEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isStatisticModalOpen, setIsStatisticModalOpen] = useState(false);
  const [yearToDelete, setYearToDelete] = useState(null);
  const [labelToDelete, setLabelToDelete] = useState(null);
  const [newYear, setNewYear] = useState("");
  const [currentStatistic, setCurrentStatisticData] = useState({});
  const [years, setYears] = useState(["All"]);
  const [activeStatistic, setActiveStatistic] = useState("General");
  const [activeUsers, setUsers] = useState([]);
  const [statisticsData, setStatisticsData] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");

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

      const response = await axios.get("/api/overview", {
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:3002/api/current-user",
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
    fetchData(searchQuery);
  }, [activeCategory, activeYear, filters, searchQuery]);

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

  const fetchStatistics = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`/api/stats/${activeYear}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch statistics");
      }
      setStatisticsData(response.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      setStatisticsData({});
    }
  };

  useEffect(() => {
    if (activeYear) {
      fetchStatistics();
    }
  }, [activeYear]);

  //Add, delete, and update functions

  const confirmAddYear = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const defaultGoals = {
        General: [],
        Goal1: [],
        Goal2: [],
        Goal3: [],
      };

      const response = await axios.post(
        "/api/stats",
        {
          year: newYear,
          goals: defaultGoals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        fetchYears();
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add year:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding year:", error);
    }
  };

  const confirmDeleteYear = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(`/api/years/${yearToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setYears(years.filter((year) => year !== yearToDelete));
        setIsDeleteModalOpen(false);
        fetchYears();
      } else {
        throw new Error("Failed to delete year");
      }
    } catch (error) {
      console.error("Error deleting year:", error);
    }
  };

  const addNewLabel = async (category, numberOfClients) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `/api/stats/${activeYear}/goals/${activeStatistic}/label`,
        {
          label: category,
          valueKey: numberOfClients,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchStatistics();
        setIsGoalModalOpen(false);
      } else {
        console.error("Failed to add label:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding label:", error);
    }
  };

  const confirmDeleteLabel = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `/api/stats/${activeYear}/goals/${activeStatistic}/label/${labelToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchStatistics();
        setIsDeleteGoalOpen(false);
      } else {
        throw new Error("Failed to delete label");
      }
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  const handleStatisticUpdate = async (newLabel, newValue) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const { label, category } = currentStatistic;

      const response = await axios.put(
        `/api/stats/${activeYear}/goals/${category}/label/${label}`,
        {
          newLabel,
          newValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchStatistics();
        setIsStatisticModalOpen(false);
      } else {
        console.error("Failed to update label:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating label:", error);
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

  const handleStatisticToggle = (statistic) => {
    setActiveStatistic(statistic);
  };

  const handleGoalClick = () => {
    setIsGoalModalOpen(true);
  };

  const setCurrentStatistic = (statistic, category) => {
    setCurrentStatisticData({ ...statistic, category });
  };

  const handleDeleteLabel = (label) => {
    setLabelToDelete(label);
    setIsDeleteGoalOpen(true);
  };

  const handleDeleteYear = (year) => {
    setYearToDelete(year);
    setIsDeleteModalOpen(true);
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

  if (showWelcomeMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bb-violet">
        <div className="bg-white text-bb-violet text-3xl p-8 rounded-lg shadow-md">
          Welcome, {username}
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg w-full">
        <h1 className="header">Overview</h1>
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
              {editMode && (
                <button
                  className="absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 text-red-500 p-2"
                  onClick={() => handleDeleteYear(year)}
                  style={{ background: "transparent" }}
                >
                  <MdDeleteForever style={{ color: "red", fontSize: "24px" }} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Statistic Toggle and Display */}
        <div className="mb-2 text-lg font-bold text-bb-violet">Statistics:</div>
        <div className="flex">
          <div className="flex flex-col space-y-2">
            {statisticsData &&
              Object.keys(statisticsData.goals || {}).map((category) => (
                <ToggleButton
                  key={category}
                  category={category}
                  isActive={activeStatistic === category}
                  onClick={() => handleStatisticToggle(category)}
                  showIcon={false}
                >
                  {category}
                </ToggleButton>
              ))}
          </div>
          <div className="flex-grow ml-4 mr-10 space-y-2">
            {statisticsData.goals && statisticsData.goals[activeStatistic] && (
              <div className="flex flex-col space-y-2">
                {statisticsData.goals[activeStatistic].map(
                  (statistic, index) => (
                    <div key={index} className="relative">
                      <StatisticCard
                        label={statistic.label}
                        value={statistic.valueKey}
                        fullWidth
                      />
                      {editMode && (
                        <div className="absolute top-0 right-0 mt-1 mr-1 flex items-center space-x-2">
                          <button
                            className="text-blue-500 p-2"
                            onClick={() => {
                              setCurrentStatistic(statistic, activeStatistic);
                              setIsStatisticModalOpen(true);
                            }}
                            style={{ background: "transparent" }}
                          >
                            <MdEditSquare
                              className="text-bb-violet"
                              style={{ fontSize: "24px" }}
                            />
                          </button>
                          <button
                            className="text-red-500 p-2"
                            onClick={() => {
                              setLabelToDelete(statistic.label);
                              handleDeleteLabel(statistic.label);
                            }}
                            style={{ background: "transparent" }}
                          >
                            <MdDeleteForever
                              className="text-red-500"
                              style={{ fontSize: "24px" }}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )}
                {editMode && (
                  <div className="flex items-center justify-center mt-4">
                    <IoMdAddCircle
                      className="cursor-pointer text-bb-violet text-4xl"
                      onClick={handleGoalClick}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
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

        {/* Client List */}
        <div className="space-y-4">
          {activeUsers.map((user, index) => (
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
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteYear}
        message={`Are you sure you want to delete the year ${yearToDelete}?`}
      />

      {/* Add Year Modal */}
      <AddYearModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={confirmAddYear}
        onChange={(year) => setNewYear(year)}
      />

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onConfirm={addNewLabel}
      />

      {/* Edit Statistic Modal */}
      <EditStatisticModal
        isOpen={isStatisticModalOpen}
        onClose={() => setIsStatisticModalOpen(false)}
        onConfirm={handleStatisticUpdate}
        currentLabel={currentStatistic ? currentStatistic.label : ""}
        currentValue={currentStatistic ? currentStatistic.valueKey : ""}
      />

      {/* Delete Label Modal */}
      <DeleteGoalModal
        isOpen={isDeleteGoalOpen}
        onClose={() => setIsDeleteGoalOpen(false)}
        onConfirm={confirmDeleteLabel}
        message={`Are you sure you want to delete the category ${labelToDelete}?`}
      />
    </>
  );
};

export default Overview;
