import React, { useEffect, useState } from "react";

const JobDetail = ({ id, title, url }) => (
  <a href={url} className="board" target="_blank" rel="noopener noreferrer">
    {title || "No Title"}
  </a>
);

const PAGE_SIZE = 6;

const JobBoard = () => {
  const [jobs, setJobs] = useState([]); // store job IDs only
  const [jobData, setJobData] = useState([]); // store job details
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // fetch job IDs
  const fetchJobIds = async () => {
    try {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
      return await res.json();
    } catch (err) {
      console.error("Error fetching job IDs:", err);
      return [];
    }
  };

  // fetch job details by IDs
  const fetchJobDetails = async (ids) => {
    try {
      const promises = ids.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json())
      );
      return await Promise.all(promises);
    } catch (err) {
      console.error("Error fetching job details:", err);
      return [];
    }
  };

  // load first page
  useEffect(() => {
    const loadInitialJobs = async () => {
      setIsLoading(true);
      const jobIds = await fetchJobIds();
      setJobs(jobIds);

      const firstBatch = await fetchJobDetails(jobIds.slice(0, PAGE_SIZE));
      setJobData(firstBatch);

      setIsLoading(false);
      setHasMore(jobIds.length > PAGE_SIZE);
    };

    loadInitialJobs();
  }, []);

  // load more jobs
  const handleLoadMore = async () => {
    const start = (pageNumber + 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const nextBatch = await fetchJobDetails(jobs.slice(start, end));
    setJobData((prev) => [...prev, ...nextBatch]);
    setPageNumber((prev) => prev + 1);

    if (end >= jobs.length) setHasMore(false);
  };

  return (
    <div>
      <div className="container">
        {jobData.map((job) =>
          job ? (
            <JobDetail key={job.id} id={job.id} title={job.title} url={job.url} />
          ) : null
        )}
      </div>

      {isLoading && <p>Loading...</p>}

      {!isLoading && hasMore && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default JobBoard;
