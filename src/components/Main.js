import React from 'react';

const MainPage = () => {
  const nodeHoverStyle = {
    position: 'absolute',
    display: 'none',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    padding: '10px',
    zIndex: 100,
    transform: 'translate(-50%, -50%)', // Center the pop-up element
  };

  const handleNodeHover = (node) => {
    const popUp = document.getElementById(`node-popup-${node}`);
    popUp.style.display = 'block';
    popUp.style.visibility = 'visible';
  };

  const handleNodeLeave = (node) => {
    const popUp = document.getElementById(`node-popup-${node}`);
    popUp.style.display = 'none';
    popUp.style.visibility = 'hidden';
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', minHeight: '100vh', backgroundColor: '#E8FFED', position: 'relative' }}>
      {/* Logo in the top right corner */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <img src={process.env.PUBLIC_URL + '/images/little-tree.png'} alt="Logo" width="200" height="200" />
      </div>

      {/* Title */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h1>Welcome To AdapTree!!!</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-fluid">
        <div className="row align-items-start">
          {/* Sidebar */}
          <div className="col-md-3">
            <h2>Past Interests</h2>
            <div className="bg-light p-2 my-2 rounded"></div>
            <div className="bg-light p-2 my-2 rounded"></div>
            <div className="bg-light p-2 my-2 rounded"></div>
          </div>

          <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            {/* Root Node */}
            <a href="/root">
              <circle
                cx="250"
                cy="450"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('root')}
                onMouseLeave={() => handleNodeLeave('root')}
              />
            </a>
            <text x="250" y="455" textAnchor="middle" fontSize="16" dy=".3em">Root</text>

            {/* Branch 1 */}
            <a href="/branch1">
              <circle
                cx="125"
                cy="300"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch1')}
                onMouseLeave={() => handleNodeLeave('branch1')}
              />
            </a>
            <text x="125" y="305" textAnchor="middle" fontSize="16" dy=".3em">Branch 1</text>
            <line x1="250" y1="420" x2="125" y2="330" stroke="black" strokeWidth="2" />

            {/* Branch 1.1 */}
            <a href="/branch1-1">
              <circle
                cx="62"
                cy="150"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch1-1')}
                onMouseLeave={() => handleNodeLeave('branch1-1')}
              />
            </a>
            <text x="62" y="155" textAnchor="middle" fontSize="16" dy=".3em">Branch 1.1</text>
            <line x1="125" y1="270" x2="62" y2="180" stroke="black" strokeWidth="2" />

            {/* Branch 1.2 */}
            <a href="/branch1-2">
              <circle
                cx="188"
                cy="150"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch1-2')}
                onMouseLeave={() => handleNodeLeave('branch1-2')}
              />
            </a>
            <text x="188" y="155" textAnchor="middle" fontSize="16" dy=".3em">Branch 1.2</text>
            <line x1="125" y1="270" x2="188" y2="180" stroke="black" strokeWidth="2" />

            {/* Branch 2 */}
            <a href="/branch2">
              <circle
                cx="375"
                cy="300"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch2')}
                onMouseLeave={() => handleNodeLeave('branch2')}
              />
            </a>
            <text x="375" y="305" textAnchor="middle" fontSize="16" dy=".3em">Branch 2</text>
            <line x1="250" y1="420" x2="375" y2="330" stroke="black" strokeWidth="2" />

            {/* Branch 2.1 */}
            <a href="/branch2-1">
              <circle
                cx="312"
                cy="150"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch2-1')}
                onMouseLeave={() => handleNodeLeave('branch2-1')}
              />
            </a>
            <text x="312" y="155" textAnchor="middle" fontSize="16" dy=".3em">Branch 2.1</text>
            <line x1="375" y1="270" x2="312" y2="180" stroke="black" strokeWidth="2" />

            {/* Branch 2.2 */}
            <a href="/branch2-2">
              <circle
                cx="438"
                cy="150"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="white"
                onMouseEnter={() => handleNodeHover('branch2-2')}
                onMouseLeave={() => handleNodeLeave('branch2-2')}
              />
            </a>
            <text x="438" y="155" textAnchor="middle" fontSize="16" dy=".3em">Branch 2.2</text>
            <line x1="375" y1="270" x2="438" y2="180" stroke="black" strokeWidth="2" />
          </svg>

          {/* Tree Image and Button */}
          <div className="col-md-6 text-center">
            <div>
              <button className="btn btn-outline-primary">New Interest</button>
            </div>
          </div>

          <div className="col-md-3">
            {/* Placeholder for Right Space */}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="container-fluid">
        <div className="row mt-4 justify-content-center">
          <button className="btn btn-outline-secondary mx-2">Quiz Me!</button>
          <button className="btn btn-outline-secondary mx-2">Teach Me!</button>
          <button className="btn btn-outline-secondary mx-2">Ask Me!</button>
        </div>
      </div>

      {/* Centralized Text Box at the Bottom */}
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <input
              type="text"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: '40px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                padding: '10px',
                resize: 'none',
                overflow: 'auto',
              }}
              placeholder="Enter the topic you want to explore next..."
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Node Pop-up Text Boxes */}
      <div id="node-popup-root" style={nodeHoverStyle}>
        Pop-up text for Root
      </div>
      <div id="node-popup-branch1" style={nodeHoverStyle}>
        Pop-up text for Branch 1
      </div>
      <div id="node-popup-branch1-1" style={nodeHoverStyle}>
        Pop-up text for Branch 1.1
      </div>
      <div id="node-popup-branch1-2" style={nodeHoverStyle}>
        Pop-up text for Branch 1.2
      </div>
      <div id="node-popup-branch2" style={nodeHoverStyle}>
        Pop-up text for Branch 2
      </div>
      <div id="node-popup-branch2-1" style={nodeHoverStyle}>
        Pop-up text for Branch 2.1
      </div>
      <div id="node-popup-branch2-2" style={nodeHoverStyle}>
        Pop-up text for Branch 2.2
      </div>
    </div>
  );
};

export default MainPage;
