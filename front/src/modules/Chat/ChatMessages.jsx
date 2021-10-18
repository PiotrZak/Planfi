import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { receiveMessage, baseUrl } from "store/actions/messageActions";
import { useSelector } from "react-redux";

const MessageList = ({roomId, connection}) => {

    const currentRoom = useSelector((state) => state.requestRooms.currentRoom);
    const url = roomId ? `${baseUrl}/${currentRoom.id}` : baseUrl;

    const {
        data,
        loading,
        error,
      } = useFetch(url);


  useEffect(() => {

    console.log(roomId)
    connection.on(
      "ReceiveMessage",
      (user, message, roomId, messageId, postedAt) => {
        receiveMessage(
          user,
          message,
          roomId,
          messageId,
          postedAt,
          roomId
        );
      }
    );
  }, [roomId, currentRoom]);

  return (
    <div className="message-list">
        {!roomId
        ?<div className="join-room">Join a room to start chatting.</div>
        :
        <div>
        {data && data.map((message, i) => {
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
