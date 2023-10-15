import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatInput from "./ChatInput";
import './custom.css';

console.log("GGGG")
var formData;
var response1;
var location;
var interestList;
var bool;

const handleNodeClick = async (node) => {
  console.log(`Clicked on node: ${node}`);
  // Handle node click logic here
  const data = {
    name: formData.name,
    email: formData.email,
    major: formData.major,
    interests: node,
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
      response1 = result;
      console.log("Data successfully sent to the server:", result);
      console.log(JSON.parse(result)["Branch 1.1"]);
      console.log(result);
      console.log(data);
      location.state.response = result;
      formData = data
      interestList = JSON.parse(result)["interests"]
      console.log("Interest List: ", interestList)
      console.log("40")
      location.state.formData = formData;
      console.log("the formdata", formData)
      //navigate("/main", { state: { formData: data, response: result } });
    } else {
      console.error("Failed to send data to the server.");
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }

}


const Main = () => {
  useEffect(() => {
    // Your code here will run once on component mount or page load
    bool = false;
  }, []);
  location = useLocation();
  formData = location.state ? location.state.formData : null;
  response1 = location.state ? location.state.response : null;

  const [isTeachMeClicked, setIsTeachMeClicked] = useState(false);
  const [teachMeText, setTeachMeText] = useState("");

  //handleNodeClick("dogs")
  console.log("Form Data: ", formData);
  console.log("Response Data:", response1);
  if (!bool) {
    interestList = JSON.parse(response1)["interests"];
    bool = true
  }


  return (
    <div className="main d-flex">
      {/* Sidebar */}
      <Sidebar handleNodeClick={handleNodeClick} />

      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="row">
          <div className="col-12 custom-main-container d-flex align-items-center justify-content-center" style={{ height: '85.5vh', backgroundColor: '#E8FFED', borderBottom: '1px solid #000' }}>
            <div>
              <h1 className="text-center pb-4 ">Welcome To AdapTree!</h1>
              {formData && (
                <div>
                  <h4 className="mt-4 pb-5 text-center">
                    Here is an overview for your interest: <strong>{formData.interests}</strong>. Click on each leaf to learn more.
                  </h4>

                </div>
              )}
              {isTeachMeClicked ? null : (
                <img
                  src={process.env.PUBLIC_URL + '/images/main.png'}
                  alt="Node Image"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
              {teachMeText && (
                <div>
                  {teachMeText}
                </div>
              )}
               {isTeachMeClicked ? null : (
              <div className="container">
                <label style={{ fontSize: "24px", position: "relative", top: "-210px", left: "340px",  width:"200px", height:"200px",   color: 'transparent'}} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 0"])}>
                  <span className="popup">{JSON.parse(response1)["Branch 0 Description"]}</span>
                </label>
                <label style={{ fontSize: "18px", position: "relative", top: "-460px", left: "12px",  width:"108px", height:"110px",  color: 'transparent' }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 1"])}>
             
                  <span className="popup">{JSON.parse(response1)["Branch 1 Description"]}</span>
                </label>
                <label style={{ fontSize: "18px", position: "relative", top: "-462px", left: "265px", width:"108px", height:"110px",  color: 'transparent'  }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 2"])}>
                
                  <span className="popup">{JSON.parse(response1)["Branch 2 Description"]}</span>
                </label>
                <label style={{ fontSize: "10px", position: "relative", top: "-604px", left: "-302px", width:"75px", height:"79px", color: 'transparent'  }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 1_1"])}>
              
                  <span className="popup">{JSON.parse(response1)["Branch 1_1 Description"]}</span>
                </label>
                <label style={{ fontSize: "10px", position: "relative", top: "-610px", left: "-158px", width:"75px", height:"79px",  color: 'transparent' }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 1_2"])}>
        
                  <span className="popup">{JSON.parse(response1)["Branch 1_2 Description"]}</span>
                </label>
                <label style={{ fontSize: "10px", position: "relative", top: "-615px", left: "-86px",  width:"75px", height:"79px",  color: 'transparent'  }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 2_1"])}>

                  <span className="popup">{JSON.parse(response1)["Branch 2_1 Description"]}</span>
                </label>
                <label style={{ fontSize: "10px", position: "relative", top: "-607px", left: "66px", width:"75px", height:"79px",  color: 'transparent'  }} className="transparent-label" htmlFor="username" onClick={() => handleNodeClick(JSON.parse(response1)["Branch 2_2"])}>
 
                  <span className="popup">{JSON.parse(response1)["Branch 2_2 Description"]}</span>
                </label>

              </div>
               )}

            </div>
          </div>

        </div>
      </div>
      <ChatInput setIsTeachMeClicked={setIsTeachMeClicked} setTeachMeText={setTeachMeText} />
    </div>
  );
};

export const getFormData = () => {
  return formData;
};

export const getInterestList = () => {
  return interestList;
};

export default Main;


