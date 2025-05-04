import React from "react";
import "../styles/global.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container text-white text-center">
        <h1 className="display-4 fw-bold mb-3">Welcome to PetAdopt</h1>
        <p className="lead mb-4">
          Explore, manage, and adopt lovable pets. Track their moods, edit their
          profiles, and give them a forever home!
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/home" className="btn btn-primary btn-lg px-4" aria-label="Go to homepage">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
