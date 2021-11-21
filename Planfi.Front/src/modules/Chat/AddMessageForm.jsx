import React from 'react'

const AddMessageForm = ({ room, setMessage, message, handleSubmit }) => {
  return (
    <form className="commentForm" onSubmit={(e) => handleSubmit(e)}>
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
      <button autoFocus={true} type="submit">
        Submit
      </button>
    </form>
  )
}

export default AddMessageForm
