import React, {useState} from "react";
import Main, { getFormData } from "./Main";
import { useNavigate } from 'react-router-dom';

var stored_question = ""

const ChatInput = () => {
  const [displayText, setDisplayText] = useState("Select nodes to explore your interests!");
  const [entryDisplayText, setEntryDisplayText] = useState("Welcome to AdapTree");
  const [textInput, setTextInput] = useState("");

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
        setDisplayText(JSON.parse(result).explanation);
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
        stored_question = JSON.parse(result).question
        setDisplayText(stored_question);
        setEntryDisplayText("Submit your answer to the question here!")
      } else {
        console.error("Failed to send data to the server.");
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }

  };

  const handleAnswerFeedback = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter key behavior

      var major1 = getFormData().major


      const data = {
        question: stored_question,
        answer: textInput,
        major: major1
      };
  
      try {
        const response = await fetch("http://localhost:8000/feedbackans/", {
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
          setDisplayText(JSON.parse(result).feedback);
          setTextInput("");
          setEntryDisplayText("Review feedback for your response!")
        } else {
          console.error("Failed to send data to the server.");
        }
  
      } catch (error) {
        console.error("An error occurred:", error);
      }


      


    }
  };

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
      {/* Plain Text Container */}
      <div className="row">
        <div className="col-12 offset-md-3 col-md-8 d-flex justify-content-center">
          <p>{displayText}</p>
        </div>
      </div>
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
            placeholder={entryDisplayText}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleAnswerFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;