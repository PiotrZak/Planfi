import React, { useState } from "react";

const AddMessageForm = ({ connection, roomId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    connection
      .invoke("SendMessage", roomId, 'user', message)
      .catch((err) => console.error(err.toString()));

      setMessage('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="add-message-form">
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
