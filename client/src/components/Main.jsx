import React, { useEffect, useState, useCallback } from 'react';
import '../components-styling/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

function Main() {
  const [journeys, setJourneys] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJourneys = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/journeys?limit=100&page=${currentPage}`);
      const data = await response.json();
      setJourneys(data.journeys);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log('Failed to fetch journeys:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchJourneys();
  }, [currentPage, fetchJourneys]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageRange = 2; // Number of pages to show before and after the current page
    const pages = [];

    // Generate page buttons based on current page and totalPages
    for (let i = Math.max(1, currentPage - pageRange); i <= Math.min(currentPage + pageRange, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        {currentPage !== 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="pagination-button">
            Previous
          </button>
        )}
        {pages}
        {currentPage !== totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="pagination-button">
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="homediv">
      <div className="home-nav">
        <ul className="homenav-list">
          <FontAwesomeIcon id="homeIcon" icon={faBicycle} size="2x" />
          <li><Link to="/stations" className='nav-link'>Stations</Link></li>
        </ul>
      </div>
      <div className="welcome-div">
        <h1>Welcome to Helsinki Bike App!</h1>
      </div>
      <div className="ride-div">
        <h2 className="ride-text">Take a closer look at the journeys around Helsinki!</h2>
        <table className="ride-table">
          <thead>
            <tr className="table-headers">
              <th>Departure Station</th>
              <th>Return Station</th>
              <th>Distance</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey) => (
              <tr className="table-row" key={journey._id}>
                <td>{journey['Departure station name']}</td>
                <td>{journey['Return station name']}</td>
                <td>{(journey['Covered distance (m)'] / 1000).toFixed(2)} km</td>
                <td>{(journey['Duration (sec'][')'] / 60).toFixed(2)} min</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
}

export default Main;
