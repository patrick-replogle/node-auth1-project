import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Dashboard = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/restricted/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log("Error fetching users :", err));
  }, []);
  return (
    <div>
      <h1>{props.message}</h1>
      {users.map(user => {
        return <h1 key={user.id}>username: {user.username}</h1>;
      })}
    </div>
  );
};

export default Dashboard;
