import React, { useState } from "react";

const Intro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (your existing code for handling form submission)
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center p-3" style={{ margin: "0 20px" }}> {/* Added margin to left container */}
        <h1 className="mt-5">Basic Form</h1>
        <p>
          Welcome to our website. Please fill out the following form to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="major" className="form-label">Major:</label>
            <input
              type="text"
              id="major"
              name="major"
              placeholder="Enter your major"
              className="form-control"
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interest" className="form-label">Interest:</label>
            <input
              type="text"
              id="interest"
              name="interest"
              placeholder="Enter your interest"
              className="form-control"
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="text-center mt-5" style={{ margin: "0 20px" }}> {/* Added margin to right container */}
        <img
          src="https://via.placeholder.com/400" // Increase the image size as needed
          alt="Dummy Image"
          className="img-fluid mb-5" // Increased margin bottom
        />
      </div>
    </div>
  );
};

export default Intro;