import React, { useEffect, useState } from 'react';
import '../components-styling/stations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch('http://localhost:8000/stations');
      const data = await response.json();
      setStations(data.stations);
      console.log(data.stations);
    } catch (error) {
      console.log('Failed to fetch stations:', error);
    }
  };


  return (
    <div className="homediv">
      <div className="home-nav">
        <ul className="homenav-list">
          <FontAwesomeIcon id="homeIcon" icon={faBicycle} size="2x" />
          <li><Link to="/" className='nav-link'>Journeys</Link></li>
        </ul>
        <input id="home-search" type="text" placeholder="Search for stations and see the rides!" />
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
                <td>{station.Kaupunki}</td>
                <td>{station.Operaattor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stations;
