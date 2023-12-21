import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div>
      <header>
        <nav className="navbar navbar-light shadow-sm">
          <div className="container">
            <div className="d-flex align-items-center">
              <img
                src="coffee.png"
                width={50}
                alt="Coffix T Logo"
                className="logo-img me-3"
              />
              <Link to="/" className="navbar-brand">
                Coffix T
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mt-3">
          {children}
          <ToastContainer />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
