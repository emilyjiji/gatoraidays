import React from "react";
import './custom.css';

const ChatInput = () => {
  return (
    <div className="container-fluid fixed-bottom mb-5">
      {/* Buttons */}
      <div className="row">
        <div className="custom-bc col-12 d-flex justify-content-center" >
          <div className="image-container" >
            <img
              src={process.env.PUBLIC_URL + '/images/main-nodes.png'}
              alt="Node Image"
              style={{ width: "40%", height: "auto", marginLeft: "523px", marginBottom: "260px" }}
            />
          </div>
        </div>
      </div>
      <hr className="pb-4" style={{ width: "84vw", marginLeft: "340px"}} />
      <div className="container-fluid">
        <div className="row offset-md-2 mt-4 justify-content-center">
          <button className="btn btn-outline-secondary mx-2">Quiz Me!</button>
          <button className="btn btn-outline-secondary mx-2">Teach Me!</button>
          <button className="btn btn-outline-secondary mx-2">Ask Me!</button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 offset-md-3 col-md-8 d-flex justify-content-center">
          <input
            type="text"
            className="form-control"
            style={{
              maxWidth: "1000px",
              borderRadius: "4px",
            }}
            placeholder="Enter the topic you want to explore next..."
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
