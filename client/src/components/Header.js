import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="text-center py-3 bg-success text-white">
      <h1>JobTracker</h1>
      <p className="tagline">Your personal job application tracker to manage, organize, and stay on top of your job search!</p>
    </header>
  );
}

export default Header;
