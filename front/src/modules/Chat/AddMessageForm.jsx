import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AddMessageForm = ({ connection, room }) => {
  const [message, setMessage] = useState("");
  const currentRoom = useSelector((state) => state.requestRooms.currentRoom);

  const handleSubmit = () => {
    connection
      .invoke("SendMessage", room.id, 'user', message)
      .catch((err) => console.error(err.toString()));
      setMessage('');
  };

  useEffect(() => {
  }, [currentRoom]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="add-message-form">
      
      {room &&
      <>
      <p>{room.id}</p>
      <p>{room.name}</p>
      </>}
      
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Say something to the room..."
        type="text"
      />
      <button type="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
    </form>
  );
};

export default AddMessageForm;
