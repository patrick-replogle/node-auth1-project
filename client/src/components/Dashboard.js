import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

const Dashboard = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .create({
        withCredentials: true
      })
      .get("http://localhost:5000/api/restricted/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log("Error fetching users :", err));
  }, []);

  const logout = e => {
    e.preventDefault();
    axios
      .delete("http://localhost:5000/api/logout")
      .then(res => {
        console.log(res);
        props.history.push("/login");
      })
      .catch(err => console.log("error loggin out: ", err));
  };
  return (
    <div>
      <h1>{props.message}</h1>
      <button onClick={logout}>logout</button>
      {users.map(user => {
        return <h1 key={user.id}>username: {user.username}</h1>;
      })}
    </div>
  );
};

export default Dashboard;
