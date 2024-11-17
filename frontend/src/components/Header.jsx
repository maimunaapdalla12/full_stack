import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import UserDropdown from './UserDropdown';

const Header = ({ toggleSidebar }) => {
  const { user, logOut } = useUser();

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-lg font-bold mr-4">
        
        </button>
        <h1 className="cursor-pointer">Logo</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {user ? (
            <>
            
            <li>
               <Link to="/" className="text-lg font-bold" style={{ color: 'grey' }}>
               Home
                </Link>
              </li>
              <li>
                <Link to="/Pages" className="text-lg font-bold" style={{ color: 'grey' }}>
                Posts
                </Link>
              </li>
               
              <li>
                <UserDropdown user={user} logOut={logOut} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-lg font-bold">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-lg font-bold">
                  Login
                </Link>
              </li>
              <span>if you don't have account</span>
              <li>
                <Link to="/register" className="text-lg font-bold">
                 Reguster Now
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
