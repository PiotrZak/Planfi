import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { receiveMessage, baseUrl } from "store/actions/messageActions";
import { useSelector } from "react-redux";
import AddMessageForm from "./AddMessageForm";
import useDebounce from "hooks/useDebounce";
import axios from 'axios';

const MessageList = ({ roomId, connection }) => {
  const [message, setMessage] = useState("");
  const currentRoom = useSelector((state) => state.requestRooms.currentRoom);

  const url = roomId ? `${baseUrl}/${currentRoom.id}` : baseUrl;

  const debouncedMessage= useDebounce(message, 500);
  const { data, loading, error } = useFetch(url);

  const handleSubmit = (message) => {
      console.log(message)
    connection
      .invoke("SendMessage", roomId, "user", message)
      .catch((err) => console.error(err.toString()));
    setMessage("");
  };

  const fetchMessages = (url) => {
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.error(err)
    })
  }

  useEffect(() => {
    fetchMessages(url)
    console.log('useEffect call')
    connection.on(
      "ReceiveMessage",
      (user, message, roomId, messageId, postedAt) => {
        receiveMessage(user, message, roomId, messageId, postedAt, roomId);
      }
    );
  }, [roomId, debouncedMessage]);

  return (
    <div className="message-list">
      {!roomId ? (
        <div className="join-room">Join a room to start chatting.</div>
      ) : (
        <div>
          {data &&
            data.map((message, i) => {
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
      )}
      {currentRoom && (
        <AddMessageForm
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          room={currentRoom}
          userName={"userName"}
          connection={connection}
        />
      )}
    </div>
  );
};

export const getDateString = (dateVal) => {
  const date = new Date(dateVal);
  return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
};

const Message = (props) => {
  return (
    <div className="message">
      <div className="message-username">
        {props.userName} ~<b>{getDateString(props.postedAt)}</b>
      </div>
      <div className="message-text">{props.contents}</div>
    </div>
  );
};

export default MessageList;
