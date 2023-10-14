import React, {useState} from "react";


const Intro = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [interest, setInterest] = useState("");

    return (
        <div className="container">
          <h1>Basic Form</h1>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
    
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Enter your email" />
    
            <label htmlFor="major">Major:</label>
            <input type="text" id="major" name="major" placeholder="Enter your major" />
    
            <label htmlFor="interest">Interest:</label>
            <input type="text" id="interest" name="interest" placeholder="Enter your interest" />
    
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
}

export default Intro;