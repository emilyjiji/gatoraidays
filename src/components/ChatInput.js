import React from "react";

const ChatInput = () => {
  return (
    <div className="container-fluid fixed-bottom mb-5">
       {/* Buttons */}
      <div className="container-fluid">
        <div className="row offset-md-2 mt-4 justify-content-center">
          <button className="btn btn-outline-secondary mx-2">Quiz Me!</button>
          <button className="btn btn-outline-secondary mx-2">Teach Me!</button>
          <button className="btn btn-outline-secondary mx-2">Ask Me!</button>
        </div>
      </div>
      <div className="row mt-4">
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




