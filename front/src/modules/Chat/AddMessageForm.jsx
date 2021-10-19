import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AddMessageForm = ({ message, setMessage, room, handleSubmit }) => {

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="add-message-form">
      {room && (
        <>
          <p>{room.id}</p>
          <p>{room.name}</p>
        </>
      )}

      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Say something to the room..."
        type="text"
      />
      <button type="submit" onClick={() => handleSubmit(message)}>
        Submit
      </button>
    </form>
  );
};

export default AddMessageForm;
