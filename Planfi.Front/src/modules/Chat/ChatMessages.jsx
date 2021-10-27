import React, { useEffect, useState } from "react";
import { receiveMessage, baseUrl } from "store/actions/messageActions";
import { useSelector } from "react-redux";
import axios from 'axios';
import AddMessageForm from './AddMessageForm';
import Message from './Message';

const MessageList = ({roomId, connection}) => {

    const currentRoom = useSelector((state) => state.requestRooms.currentRoom);
    const url = roomId ? `${baseUrl}/${currentRoom.id}` : baseUrl;
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("");
    const [rerender, setRerender] = useState(false);

      const handleSubmit = () => {
        connection
          .invoke("SendMessage", currentRoom.id, 'user', message)
          .catch((err) => console.error(err.toString()));
          setMessage("")
          setRerender(!rerender);
      };

      const fetchMessages = (url) => {
        const source = axios.CancelToken.source();
        axios.get(url, { cancelToken: source.token })
        .then(res => {
          setMessages(res.data)
        })
        .catch(err => {
            console.error(err)
        })
      }
    
  useEffect(() => {
    fetchMessages(url)
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
  }, [roomId, currentRoom, rerender]);

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
      {currentRoom && (
        <AddMessageForm
          setMessage={setMessage}
          message ={message}
          room={currentRoom}
          userName={"userName"}
          connection={connection}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};


export default MessageList;
