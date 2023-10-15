import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatInput from "./ChatInput";
import './custom.css';

var formData;
var response;

const Main = () => {
    const location = useLocation();
    formData = location.state ? location.state.formData : null;
    response = location.state ? location.state.response : null;

    const [isTeachMeClicked, setIsTeachMeClicked] = useState(false);
    const [teachMeText, setTeachMeText] = useState("");

  console.log("Form Data: ", formData);
  console.log("Response Data:", response);

  return (
    <div className="main d-flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="row">
          <div className="col-12 custom-main-container d-flex align-items-center justify-content-center" style={{ height: '86vh', backgroundColor: '#E8FFED', borderBottom: '1px solid #000' }}>
            <div>
              <h1 className="text-center pb-4">Welcome To AdapTree!</h1>
              {formData && (
                <div>
                <h4 className="mt-4 pb-5 text-center">
  Here is an overview for your interest: {formData.interests}. Click on each leaf to learn more.
</h4>

                </div>
            )}
            {isTeachMeClicked ? null : (
                                <img
                                    src={process.env.PUBLIC_URL + '/images/main.png'}
                                    alt="Node Image"
                                    style={{ width: "100%", height: "auto" }}
                                />
                            )}
                            {teachMeText && (
                                <div>
                                    {teachMeText}
                                </div>
                            )}
            </div>
          </div>

        </div>
      </div>
      <ChatInput setIsTeachMeClicked={setIsTeachMeClicked} setTeachMeText={setTeachMeText}/>
    </div>
  );
};

export const getFormData = () => {
  return formData;
};

export default Main;


