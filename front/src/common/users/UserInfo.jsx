import React from 'react';
import { Avatar } from "../Avatar"

export const UserInfo = ({ user }) => {

    return (
        <div className="user-container__info">
            {user &&
                <div>
                    <Avatar avatar={user.avatar} id={user.userId} />
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>{user.role}</p>
                    <p>{user.phoneNumber}</p>
                    <p>{user.email}</p>
                </div>
            }
        </div>
    );
}