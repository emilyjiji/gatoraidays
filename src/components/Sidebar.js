import React from "react";
import Main, {getInterestList, getFormData} from "./Main";
import './custom.css'



const Sidebar = ({ handleNodeClick }) => {
  // Define an array of sidebar items

  return (
    <div className="col-md-3 col-lg-2 d-md-block sidebar" style={{ height: "100vh", color: "#fff", backgroundColor: "#0F2D25" }}>
      <style>
        {`
          .nav-link {
            color: #fff; /* Change the color to your preferred color */
            font-size: x-large;
          }
        `}
      </style>
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <h4 className="mt-4 mb-4" style={{fontSize: "18px", textAlign: "center"}}>Past Interests</h4>
            <hr style={{ background: "#fff", width: "100%", marginLeft: 0}} />
          </li>
          {getInterestList().map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                href="#"
                className="nav-link"
                style={{fontSize: "16px"}}
                onClick={(event) => {
                  event.preventDefault();
                  handleNodeClick(item);}
                }
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;