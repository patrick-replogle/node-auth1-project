import React, { useState } from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      <Route exact path="/" component={Register} />
      <Route
        path="/login"
        render={props => {
          return (
            <Login
              {...props}
              setUsername={setUsername}
              setMessage={setMessage}
            />
          );
        }}
      />
      <Route
        path="/dashboard"
        render={props => {
          return <Dashboard {...props} username={username} message={message} />;
        }}
      />
    </div>
  );
}

export default App;
