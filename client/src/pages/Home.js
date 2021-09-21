import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // Request all users' thoughts to render on component mount event
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data from db and store as JSON
        const res = await fetch('/api/users');
        const jsonData = await res.json();
        // sort the array by createdAt property ordered by descending values
        const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
        // store the data
        setThoughts([...data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} setThoughts={setThoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
