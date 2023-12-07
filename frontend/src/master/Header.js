import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-center" to="/">
            User Management Application
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/add/user">
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/user/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
};
export default Header;
