import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../../services/userServices";
import { alertActions } from "../../redux/actions/alert.actions";
import Return from "./../../common/Return"
import Button from "./../../common/GenericElement/GenericElement"
import { Loader } from "../../common/Loader"

export const Users = () => {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        userService
            .allUsers()
            .then((data) => {
                setUsers(data);
                setIsLoading(false)
                // dispatch(alertActions.success("User succesfully loaded!"));
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });
    }, []);

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>Users</h2>
            </div>
            <div className="users">
                <Loader isLoading={isLoading}>
                    {users && users.map((user, i) => <Button circle={true} image={user.avatar} key={i} headline={`${user.firstName}  ${user.lastName}`} user={user} subline={user.role} />)}
                </Loader>
            </div>
        </div>
    );
};
