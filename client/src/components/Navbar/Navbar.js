import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <img src="/bus_logo.png" alt="Bus logo" width="60" height="60" />
          <span>Top Ten Bus</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
