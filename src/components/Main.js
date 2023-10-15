import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatInput from "./ChatInput";
import './custom.css';

const Main = () => {
    const location = useLocation();
    const formData = location.state ? location.state.formData : null;
    const response = location.state ? location.state.response : null;

    console.log("Form Data: ", formData);
    console.log("Response Data:", response);

    return (
        <div className="main" >
            <div className="container-fluid">
                <div className="row ">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center mt-5">
                        <div style={{ width: "100%", textAlign: "center", marginLeft: "10px", }}>
                            <h1>Welcome To AdapTree!!!</h1>
                            {formData && (
                                <div>
                                    <h4 className="mt-4">
                                        Here is an overview for your interest: {formData.interest}
                                        Click on the leaf to learn more:
                                    </h4>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <ChatInput />
        </div>
    );
};

export default Main;



