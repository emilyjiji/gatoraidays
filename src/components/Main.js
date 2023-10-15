import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatInput from "./ChatInput";

const Main = () => {
  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  console.log("Form Data: ",formData);

  return (
    <div className="main">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h1>Main</h1>
            {formData && (
              <div>
                <h2>Form Data:</h2>
                <ul>
                  <li>Name: {formData.name}</li>
                  <li>Email: {formData.email}</li>
                  <li>Major: {formData.major}</li>
                  <li>Interest: {formData.interests}</li>
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>

      <ChatInput />

    </div>
  );
};

export default Main;


