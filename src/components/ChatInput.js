import React from "react";
import Main, { getFormData } from "./Main";
import { useNavigate } from 'react-router-dom';


const ChatInput = () => {
  const navigate = useNavigate();

  
  // Function for the "Home" button
  const handleHomeClick = async () => {
    console.log("Free me from this flesh prison and end my ever-lasting suffering");
    var email1 = getFormData().email

    // Create a data object with the form values
    const data = {
      email: email1
    };

    try {
      const response = await fetch("http://localhost:8000/returnhome/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully sent to the server:", result);
        console.log(data);
        navigate("/", { state: { response: result } });
      } else {
        console.error("Failed to send data to the server.");
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }



  };

  // Function for the "Teach Me!" button
  const handleTeachMeClick = async () => {
    console.log("Teach Me! button clicked");

    var interest1 = getFormData().interests
    var major1 = getFormData().major


    // Create a data object with the form values
    const data = {
      interest: interest1,
      major: major1
    };

    try {
      const response = await fetch("http://localhost:8000/explainmore/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully sent to the server:", result);
        console.log(data);
      } else {
        console.error("Failed to send data to the server.");
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }


  };

  // Function for the "Ask Me!" button
  const handleAskMeClick = async () => {
    console.log("Ask Me! button clicked");

    var interest1 = getFormData().interests

    // Create a data object with the form values
    const data = {
      interest: interest1
    };

    try {
      const response = await fetch("http://localhost:8000/getquestion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully sent to the server:", result);
        console.log(data);
      } else {
        console.error("Failed to send data to the server.");
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }

  };

  return (
    <div className="container-fluid fixed-bottom mb-5">
      {/* Buttons */}
      <div className="container-fluid">
        <div className="row offset-md-2 mt-4 justify-content-center">
          <button className="btn btn-outline-secondary mx-2" onClick={handleHomeClick}>Home</button>
          <button className="btn btn-outline-secondary mx-2" onClick={handleTeachMeClick}>Teach Me!</button>
          <button className="btn btn-outline-secondary mx-2" onClick={handleAskMeClick}>Ask Me!</button>
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