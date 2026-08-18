import React from "react";
import { NavLink } from "react-router-dom";
import {

  LogoutOutlined,
  HomeOutlined,
  UploadOutlined,
  SettingOutlined,

  UserOutlined,
} from "@ant-design/icons";
import { UseAuthContext } from "../Context/UseAuthContext";

export const SideNav: React.FC = () => {
  const { dispatch, user } = UseAuthContext();

  const handleNavLinkClick = () => {
    const dismissButton = document.querySelector(
      "#offcanvasNavbar [data-bs-dismiss='offcanvas']"
    ) as HTMLElement | null;

    if (dismissButton) {
      dismissButton.click();
    }
  };

  const handleSignOut = () => {
    if (!user) return;

    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  };

 

  return (
    <nav className="navbar bg-body-tertiary" data-bs-theme="light">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand" to="/admin_jctbdil1$">
          <h2>TTAF Admin</h2>
        </NavLink>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          {/* Header */}
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              TTAF
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1 pe-3">
              {/* Dashboard */}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin_jctbdil1$"
                  onClick={handleNavLinkClick}
                >
                  <HomeOutlined className="me-2" />
                  Dashboard
                </NavLink>
              </li>

              {/* Upload */}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin_jctbdil1$/upload"
                  onClick={handleNavLinkClick}
                >
                  <UploadOutlined className="me-2" />
                  Upload
                </NavLink>
              </li>

              {/* Settings dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <SettingOutlined className="me-2" />
                  Settings
                </a>

                <ul className="dropdown-menu">
                  
                  

                  {/* Accept Admin */}
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin_jctbdil1$/settings/accept"
                      onClick={handleNavLinkClick}
                    >
                      <UserOutlined className="me-2" />
                      Accept Admin
                    </NavLink>
                  </li>

                  {/* Admin Users */}
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin_jctbdil1$/settings/adminUsers"
                      onClick={handleNavLinkClick}
                    >
                      <UserOutlined className="me-2" />
                      View Admin Users
                    </NavLink>
                  </li>
                </ul>
              </li>

              

              <li>
                <hr className="dropdown-divider" />
              </li>

              {/* Sign Out */}
              {user && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link border-0 bg-transparent w-100 text-start"
                    onClick={() => {
                      handleNavLinkClick();
                      handleSignOut();
                    }}
                  >
                    <LogoutOutlined className="me-2" />
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};