import React from "react";
import { Link } from "react-router-dom";

function NavigationBar(props) {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="  navbar-brand">
            Students
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/edit">Update</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
