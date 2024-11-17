import React, { useState } from 'react';

const UserDropdown = ({ user, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" style={{ backgroundColor: isOpen ? '#f9fafb' : 'transparent' }}>
      <button onClick={toggleDropdown} className="text-lg  font-bold" style={{ color: 'grey' }}>
        Profile
      </button>


      {isOpen && (

        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10" style={{ backgroundColor: '#dba0a0' }}>
          <li className="px-4 py-2">
            <img src="src/assets/images.jpeg" alt="User Profile" className="w-12 h-12 rounded-full mx-auto mb-2" />
            <div className="text-center">
              <span className="block text-lg font-bold" style={{ color: 'grey' }}>
                {user?.userName}
              </span>
            </div>
          </li>
          <li className="text-lg font-bold cursor-pointer text-center py-2 hover:bg-gray-100" style={{ color: 'grey' }} onClick={logOut}>
            Log Out
          </li>
        </ul>
      
      )}
      </div>
 
  );
};

export default UserDropdown;
