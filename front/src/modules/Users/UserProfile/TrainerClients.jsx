import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from "services/userServices";
import GenericElement from "components/molecules/GenericElement/GenericElement"

export const TrainerClients = ({ id }) => {

    const [clients, setClients] = useState([])

    useEffect(() => {
        userService
            .allClientsByTrainer(id)
            .then((data) => {
                setClients(data)
            })
            .catch((error) => {
            });
    }, [id]);

    return (
        <div>
            {clients.length >= 1 ? clients.map((element, i) => (
                <div key={i}>
                    <Link to={{
                        pathname: `/user/${element.userId}`,
                        state: { id: element.userId }
                    }}>
                        <GenericElement circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                    </Link>
                </div>
            ))
                :
                <h2>Not Clients</h2>
            }
        </div>
    )
}