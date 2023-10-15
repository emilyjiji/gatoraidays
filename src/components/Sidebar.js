import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar" style={{ height: "100vh" }}>
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <p className="mt-3">Past Interests</p>
            <hr style={{ width: "96%"}} />
          </li>
          <li className="nav-item">
            <p>Option 1</p>
          </li>
          <li className="nav-item">
            <p>Option 2</p>
          </li>
          <li className="nav-item">
            <p>Option 3</p>
          </li>
          {/* Add more options as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


