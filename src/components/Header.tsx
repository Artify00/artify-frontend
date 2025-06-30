import React from 'react';
import { Link } from 'react-router-dom';
export const Header = () => {
  return <header className="w-full py-2 px-6 flex justify-between items-center bg-white">
      <div className="font-bold">
        <Link to="/">
          <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <Link to="/signin" className="flex items-center gap-2 text-sm font-medium hover:text-purple-600 px-3 py-2">
          <div className="w-4 h-4" />
          <span>Sign In</span>
        </Link>
        <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">
          Create Account
        </Link>
      </div>
    </header>;
};