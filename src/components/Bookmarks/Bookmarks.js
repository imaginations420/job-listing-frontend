import React, { useState, useEffect } from 'react';
import './Bookmarks.css';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    // Simulating fetching data from local storage or a database
    const fetchBookmarkedJobs = async () => {
      try {
        // Simulate a delay as if fetching data
        const data = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        setBookmarkedJobs(data);
      } catch (error) {
        console.error('Failed to fetch bookmarked jobs', error);
      }
    };

    fetchBookmarkedJobs();
  }, []);

  if (!bookmarkedJobs || bookmarkedJobs.length === 0) {
    return <div>No bookmarked jobs available</div>;
  }

  return (
    <div className="bookmarks-list">
      {bookmarkedJobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
