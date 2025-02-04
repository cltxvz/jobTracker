import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to JobTracker</h1>
      <p>Your job application management tool.</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}

export default App;
