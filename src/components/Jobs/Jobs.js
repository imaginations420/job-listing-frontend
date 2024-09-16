import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router hook to navigate

  const fetchJobs = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`);
      setJobs((prevJobs) => [...prevJobs, ...response.data.results]); // API response adjusted
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJobClick = (id) => {
    navigate(`/job/${id}`); // Navigate to job details page with job ID
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="jobs-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.phone}</p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Jobs;
