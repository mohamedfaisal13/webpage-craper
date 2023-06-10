import React from "react";

function Navbar() {
  return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "lightgray", height: "50px" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/home"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Counter
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          </button>
        </div>
      </nav>
  );
}

export default Navbar;
