import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Jobs from './components/Jobs/Jobs';
import JobDetails from './components/JobDetails/JobDetails';
import Bookmarks from './components/Bookmarks/Bookmarks';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
