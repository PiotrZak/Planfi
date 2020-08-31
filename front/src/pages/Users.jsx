import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../services/userServices";

import { alertActions } from "../redux/actions/alert.actions";

import UserComponent from "../common/UserComponent";

export const Users = (props) => {
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .allUsers()
      .then((data) => {
        setUsers(data);
        dispatch(alertActions.success("User succesfully loaded!"));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  }, []);

  return (
    <div className="container">
      <div className="users">
        {users && users.map((user) => <UserComponent user={user} />)}
      </div>
    </div>
  );
};
