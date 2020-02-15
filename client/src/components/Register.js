import React, { useState } from "react";

import axios from "axios";

const initialUser = {
  username: "",
  password: ""
};

const Register = props => {
  const [registerData, setRegisterData] = useState(initialUser);

  const handleChange = e => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", registerData)
      .then(res => {
        console.log(res);
        setRegisterData(initialUser);
        props.history.push("/login");
      })
      .catch(err => console.log("Register error: ", err));
  };

  return (
    <div>
      <h1>Register Below:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={registerData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={registerData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
