import React, { Component, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { baseUrl } from "store/actions/messageActions";
import AddMessageForm from "./AddMessageForm";

const MessageList = ({roomId, connection}) => {

    const [messages, setMessages] = useState([]);
    const url = roomId ? `${baseUrl}/${roomId}` : baseUrl;

    const {
        data,
        loading,
        error,
      } = useFetch(url);


  useEffect(() => {

    console.log(data)
    setMessages(data)
    connection.on(
      "ReceiveMessage",
      (user, message, roomId, messageId, postedAt) => {
        this.props.onReceiveMessage(
          user,
          message,
          roomId,
          messageId,
          postedAt,
          this.props.currentRoom.id
        );
      }
    );
  }, [roomId]);

  return (
    <div className="message-list">
        {!roomId
        ?<div className="join-room">Join a room to start chatting.</div>
        :
        <div>
        {messages && messages.map((message, i) => {
            return (
              <Message
                key={i}
                userName={message.userName}
                contents={message.contents}
                postedAt={message.postedAt}
              />
            );
          })}
    
        </div>
}
    </div>
  );
};

export const getDateString = dateVal => {
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

export default MessageList;
