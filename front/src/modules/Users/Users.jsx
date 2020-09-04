import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {userService} from "../../services/userServices";
import {alertActions} from "../../redux/actions/alert.actions";
import Return from "./../../common/Return"
import EmployeeButton from "../../common/EmployeeButton/EmployeeButton";

export const Users = () => {
    const [users, setUsers] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        userService
            .allUsers()
            .then((data) => {
                console.log(data);
                setUsers(data);
                // dispatch(alertActions.success("User succesfully loaded!"));
            })
            .catch((error) => {
                console.log(error);
                dispatch(alertActions.error(error.title));
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
                    <div className="container__title">
                <Return />
                <h2>Users</h2>
            </div>
            <div className="users">
                {users && users.map((user) => <EmployeeButton user={user} subline={user.role} />)}
            </div>
        </div>
    );
};
