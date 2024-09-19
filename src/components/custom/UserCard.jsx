import React from 'react';
import { Link } from 'react-router-dom'; 
import defaultAvatar from '@/assets/default-avatar.png'; 

const UserCard = ({ name, ageRange, gender, year, category, profileLink, avatar }) => {
  return (
    <Link to={profileLink} className="flex items-center justify-between p-4 bg-bb-violet text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 no-underline">
      <div className="flex items-center">
        <div className="bg-pink-400 rounded-full h-10 w-10 flex items-center justify-center mr-4">
          <img src={avatar || defaultAvatar} alt="User Avatar" className="h-6 w-6" /> 
        </div>
        <div>
          <div className="font-bold">{name}</div>
          <div>Age Range: {ageRange} Gender: {gender} Year: {year}</div>
        </div>
      </div>
      <div className="font-bold">
        {category}
      </div>
    </Link>
  );
};

export default UserCard;
