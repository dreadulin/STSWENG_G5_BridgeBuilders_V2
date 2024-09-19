import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { ToggleButton } from "@/components/custom/ToggleButton";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import search from '@/assets/search.png';
import filter from '@/assets/filter.png';
import UserCard from '@/components/custom/UserCard';
import Appbar from '@/components/ui/Appbar';
import axios from '../axiosInstance.js'; 

const defaultFilters = {
  status: 'Deleted',
  edad: '', 
  kasarian: ''
};

const Archive = () => {
  const [activeCategory, setActiveCategory] = useState("HC");
  const [activeYear, setActiveYear] = useState(2018);
  const [years, setYears] = useState(["All"]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
    fetchYears();
  }, [activeCategory, activeYear, filters, searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/archive', {
        params: {
          program: activeCategory,
          year: activeYear,
          search: searchQuery,
          edad: filters.edad,
          kasarian: filters.kasarian,
        },
      });
      setDeletedUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  //Fetch functions

  const fetchYears = async () => {
    try {
      const response = await axios.get("/api/years");
      if (response.status !== 200) {
        throw new Error("Failed to fetch years");
      }
      setYears([...response.data]);
    } catch (error) {
      console.error("Failed to fetch years:", error);
    }
  };


  //Handler functions

  const handleCategoryToggle = (category) => {
    setActiveCategory(category);
  };

  const handleYearToggle = (year) => {
    setActiveYear(year);
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

  return (
    <>
      <Appbar />
      <div className="bg-white p-6 rounded-lg w-full">
        <h1 className="header">Archive</h1>
        <hr className="my-4 border-t-2 border-bb-violet" />

        {/* Tabs */}
        <div className="mb-2 text-lg font-bold text-bb-violet">Category:</div>
        <div className="flex space-x-4 mb-4">
          <ToggleButton
            category="Home Care"
            isActive={activeCategory === "HC"}
            onClick={() => handleCategoryToggle("HC")}
          >
            Home Care
          </ToggleButton>
          <ToggleButton
            category="Community"
            isActive={activeCategory === "CBP"}
            onClick={() => handleCategoryToggle("CBP")}
          >
            Community
          </ToggleButton>
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
              style={{ paddingLeft: '2.5rem' }} 
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
                  <label htmlFor="edad" className="text-sm text-bb-violet">Age Range:</label>
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
                  <label htmlFor="kasarian" className="text-sm text-bb-violet">Gender:</label>
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
          {deletedUsers.map((user, index) => (
            <UserCard
              key={index}
              name={user.pangalan}
              ageRange={user.edad}
              gender={user.kasarian}
              year={user.yearAdmitted}
              category={user.status}
              profileLink={`/profile/${user.caseNo}`}
              avatar={user.picture}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Archive;
