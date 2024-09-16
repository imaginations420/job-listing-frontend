import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams(); // Extract job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details function
  const fetchJobDetails = useCallback(async () => {
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
      if (response.data) {
        setJob(response.data); // Assuming the API returns the specific job by ID
      } else {
        setError('Job not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch job details');
      setLoading(false);
    }
  }, [id]);

  // Fetch job details whenever `id` changes
  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>No job details available</div>;

  // Extract necessary fields from the job object
  const {
    title,
    primary_details,
    contentV3,
    company_name,
    contact_preference
  } = job;

  return (
    <div className="job-details">
      <h2>{title}</h2>
      <p><strong>Company:</strong> {company_name}</p>
      <p><strong>Location:</strong> {primary_details?.Place}</p>
      <p><strong>Salary:</strong> {primary_details?.Salary}</p>
      <p><strong>Job Type:</strong> {primary_details?.Job_Type}</p>
      <p><strong>Experience:</strong> {primary_details?.Experience}</p>
      <p><strong>Job Role:</strong> {contentV3?.job_role}</p>
      <p><strong>Job Category:</strong> {contentV3?.job_category}</p>
      <p><strong>Hours:</strong> {contentV3?.job_hours}</p>
      <p><strong>Details:</strong> {contentV3?.other_details}</p>
      {contact_preference?.whatsapp_link && (
        <a href={contact_preference.whatsapp_link} target="_blank" rel="noopener noreferrer">
          📞 {contact_preference.prefer === 1 ? 'Call via WhatsApp' : 'Call'} HR
        </a>
      )}
    </div>
  );
};

export default JobDetails;
