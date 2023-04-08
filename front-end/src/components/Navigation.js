import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='WeatherForecast'>Weater Forecast (Not Implemented)</Link></li>
      <li><Link to='Customer'>Customer</Link></li>
    </ul>
    <hr />
    </>
  );
}

export default Navigation;