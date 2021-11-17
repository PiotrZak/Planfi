import React from 'react';

const TabItemComponent = ({
    icon = '',
    title = '',
    onItemClicked = () => console.error('You passed no action to the component'),
    isActive = false,
}) => {
    return (
        <div className={isActive ? 'tabitem' : 'tabitem tabitem--inactive'} onClick={onItemClicked}>
            <i className={icon}></i>
            <p className="tabitem__title">{title}</p>
        </div>
    )
};

export default TabItemComponent;