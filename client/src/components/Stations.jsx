import React, { useEffect, useState, useCallback } from 'react';
import '../components-styling/stations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Stations() {
  const [stations, setStations] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const fetchStations = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/stations?limit=100&page=${currentPage}`);
      const data = await response.json();
      setStations(data.stations);
      setTotalPages(data.totalPages);
      console.log(data.stations);
    } catch (error) {
      console.log('Failed to fetch stations:', error);
    }
  }, [currentPage]);
  
  useEffect(() => {
    fetchStations();
  }, [currentPage, fetchStations]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageRange = 2; // Number of pages to show before and after the current page
    const pages = [];

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
          <li><Link to="/" className='nav-link'>Journeys</Link></li>
        </ul>
      </div>
      <div className="welcome-div">
        <h1>Welcome to Helsinki Bike App!</h1>
      </div>
      <div className="ride-div">
        <h2 className="ride-text">See the stations in Helsinki!</h2>
        <table className="ride-table">
          <thead>
            <tr className="table-headers">
              <th>Station Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Operator</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr className="table-row" key={station._id}>
                <td>{station.Name}</td>
                <td>{station.Osoite}</td>
                <td>{station.Kaupunki.trim() !== '' ? station.Kaupunki : 'Missing'}</td>                
                <td>{station.Operaattor.trim() !== '' ? station.Operaattor : 'Missing'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
}

export default Stations;
