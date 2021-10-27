import React, { useEffect, useState } from "react";

const getDateString = dateVal => {
    const date = new Date(dateVal);
    return date.toLocaleDateString() + " at " + 
      date.toLocaleTimeString();
  }
  

const Message = (props) => {
  return (
    <div className="message">
      <div className="message-username">
        {props.userName} ~ 
        <b>{getDateString(props.postedAt)}</b>
      </div>
      <div className="message-text">{props.contents}</div>
    </div>
  );
};

export default Message;