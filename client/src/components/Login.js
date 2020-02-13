import React, { useState } from "react";

import axios from "axios";

const initialUser = {
  username: "",
  password: ""
};

const Login = props => {
  const [loginData, setLoginData] = useState(initialUser);

  const handleChange = e => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", loginData)
      .then(res => {
        props.setUsername(res.data.username);
        props.setMessage(res.data.message);
        setLoginData(initialUser);
        props.history.push("/dashboard");
      })
      .catch(err => console.log("Login error: ", err));
  };

  return (
    <div>
      <h1>Login Below:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={loginData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
