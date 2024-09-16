import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <div className="bottom-nav">
      <Link to="/jobs">Jobs</Link>
      <Link to="/bookmarks">Bookmarks</Link>
    </div>
  );
};

export default BottomNavigation;
