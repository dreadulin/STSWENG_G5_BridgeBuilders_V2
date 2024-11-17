import React from 'react';
import { Link } from 'react-router-dom'; 

const FileCard = ({ fileName, uploadDate, profileLink, pangalan, edad, kasarian, onUnarchive }) => {
    return (
      <div className="flex items-center justify-between p-4 bg-bb-violet text-white rounded-lg transition-colors duration-200 no-underline">
        <Link to={profileLink} className="flex items-center space-x-4">
          <div>
            <div className="font-bold">{fileName}</div>
            <div className="flex space-x-4 mt-1">
              <p>Name: {pangalan}</p>
              <p>Age: {edad}</p>
              <p>Gender: {kasarian}</p>
              <p>Date Uploaded: {uploadDate}</p>
            </div>            
          </div>
        </Link>
  
        {/* Unarchive Button */}
        <button 
          className="bg-lightviolet-500 text-white py-1 px-3 rounded-lg hover:bg-violet-600 transition-colors"
          onClick={onUnarchive}
        >
          Unarchive
        </button>
      </div>
    );
  };

export default FileCard;
