import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from "./Tooltip";

const Appbar = () => {
  const [userType, setUserType] = useState(null);

  // Function to handle user logout
  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  // Function to fetch user info
  const fetchUserInfo = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('http://localhost:3002/api/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUserType(response.data.userType);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="flex align-center w-full h-28 bg-bb-white p-4 sticky top-0 z-10">
        <div className="h-full w-28 md:w-48">
          <a href="/">
            <img
              src="/src/assets/logo2.png"
              className="object-fill cursor-pointer"
            />
          </a>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center">
          {userType === "superUser" && (
            <Tooltip tooltipText={"Admin Control"} className="mr-6 ml-6">
              <a href="/admin">
                <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                  admin_panel_settings
                </span>
              </a>
            </Tooltip>
          )}

          <Tooltip tooltipText={"Overview"} className="mr-6 ml-6">
            <a href="/overview">
              <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                groups
              </span>
            </a>
          </Tooltip>

          <Tooltip tooltipText={"Archive"} className="mr-6 ml-6">
            <a href="/archive">
              <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                folder_open
              </span>
            </a>
          </Tooltip>

          <Tooltip tooltipText={"Create"} className="mr-6 ml-6">
            <a href="/create">
              <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                add_circle
              </span>
            </a>
          </Tooltip>

          <Tooltip tooltipText={"Sign Out"} className="mr-6 ml-6">
            <a>
              <span 
                className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer"
                onClick={logout}
              >
                logout
              </span>
            </a>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Appbar;
