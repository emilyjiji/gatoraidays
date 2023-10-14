import React, { useState } from "react";

const Intro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form values
    const data = {
      name: name,
      email: email,
      major: major,
      interest: interest,
    };

  try {
    const response = await fetch("http://localhost:8000/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data successfully sent to the server:", result);
    } else {
      console.error("Failed to send data to the server.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
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