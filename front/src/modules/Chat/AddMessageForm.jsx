import React from "react";

const AddMessageForm = ({ connection, room, setMessage, message, handleSubmit}) => {


  return (
      <>
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
    </>
  );
};

export default AddMessageForm;
