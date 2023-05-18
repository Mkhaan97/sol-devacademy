import React from 'react';
import '../components-styling/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons';


function Main() {
  return (
    <div className='homediv'>
      <div className="home-nav">
        <ul className="homenav-list">
          <FontAwesomeIcon id='homeIcon' icon={faBicycle} size='2x'/>
          <li>Stations</li>
        </ul>
        <input id="home-search" type="text" placeholder="Search for stations and see the rides!"/>
      </div>
      <div className="welcome-div">
        <h1>Welcome to Helsinki <br/>Bike App!</h1>
      </div>
      <div className="ride-div">
        <h2 className='ride-text'>See where people have cycled<br/>around Helsinki!</h2>
        <table className='ride-table'>
          <tbody>
            <tr className='table-headers'>
              <th>Departure</th>
              <th>Destination</th>
              <th>Distance</th>
              <th>Duration</th>
            </tr>
            <tr className='table-row'>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>500</td>
            </tr>
            <tr className='table-row'>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>500</td>
            </tr>
            <tr className='table-row'>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
              <td>500</td>
            </tr>
            <tr className='table-row'>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
              <td>500</td>
            </tr>
            <tr className='table-row'>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
              <td>500</td>
            </tr>
            <tr className='table-row'>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
              <td>500</td>
            </tr>
         </tbody>
        </table>
      </div>
    </div>
  )
}

export default Main