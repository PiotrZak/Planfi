import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import GenericElement from "components/molecules/GenericElement/GenericElement"

export const renderType = (className, type, element, i) => {
    switch (type) {
        case 'users': {
            return (
                <Link to={{
                    pathname: `/user/${element.userId}`,
                    state: { id: element.userId }
                }}>
                    <GenericElement className={className} circle={true} image={element.avatar} key={i} headline={`${element.firstName}  ${element.lastName}`} user={element} subline={element.role} />
                </Link>)
        }
        case 'plans': {
            return (
                <Link to={{
                    pathname: `/plan/${element.planId}`,
                    state: { id: element.planId }
                }}>
                    <GenericElement className={className} key={i} headline={element.title} plan={element} />
                </Link>
            )
        }
        case 'exercises': {
            return (<Link to={{
                pathname: `/exercise/${element.exerciseId}`,
                state: { id: element.exerciseId }
            }}>
                <GenericElement className={className} key={i} headline={element.name} image={element.files && element.files[0]} subline={`${element.series} / ${element.times}`} exercise={element} />
            </Link>
            )
        }
        case 'categories': {
            return (<Link to={{
                pathname: `/category/${element.categoryId}`,
                state: { id: element.exerciseId }
            }}>
                <GenericElement className={className} key={i} headline={element.title} subline={`${element.series} / ${element.times}`} category={element.category} />
            </Link>
            )
        }
    }
}