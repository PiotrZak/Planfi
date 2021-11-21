import React, { useState, useEffect } from 'react'
import ChatRoomList from './ChatRoom'
import { HubConnectionBuilder } from '@microsoft/signalr'
import MessageList from './ChatMessages'
import { useSelector } from 'react-redux'
import { CHAT_URL } from 'services/utils'

const ChatContainer = () => {
  const [connection, setConnection] = useState()
  const currentRoom = useSelector((state) => state.requestRooms.currentRoom)

  useEffect(() => {
    const connection = new HubConnectionBuilder().withUrl(CHAT_URL).build()
    setConnection(connection)

    connection
      .start({ withCredentials: false })
      .catch((err) => console.error(err.toString()))
  }, [currentRoom])

  return (
    <div className="panel">
      {connection && (
        <ChatRoomList openRoom={() => 1} connection={connection} />
      )}

      {currentRoom ? (
        <MessageList roomId={currentRoom.id} connection={connection} />
      ) : (
        <p>No room selected</p>
      )}
    </div>
  )
}

export default ChatContainer
