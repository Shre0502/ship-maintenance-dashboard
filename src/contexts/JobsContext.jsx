import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = getFromLocalStorage('jobs');
    if (stored) setJobs(stored);
  }, []);

  const addJob = (job) => {
    const updated = [...jobs, job];
    setJobs(updated);
    saveToLocalStorage('jobs', updated);
  };

  const updateJob = (updatedJob) => {
    const updated = jobs.map((j) => j.id === updatedJob.id ? updatedJob : j);
    setJobs(updated);
    saveToLocalStorage('jobs', updated);
  };

  const deleteJob = (id) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    saveToLocalStorage('jobs', updated);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);