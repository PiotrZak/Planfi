import React, { useEffect, useState } from 'react'
import { receiveMessage, baseUrl } from 'store/actions/messageActions'
import { useSelector } from 'react-redux'
import axios from 'axios'
import AddMessageForm from './AddMessageForm'
import Message from './Message'
import { MESSAGE_URL } from 'services/utils'

const MessageList = ({ roomId, connection }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const currentRoom = useSelector((state) => state.requestRooms.currentRoom)

  const url = roomId ? `${MESSAGE_URL}${currentRoom.id}` : MESSAGE_URL
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [rerender, setRerender] = useState(false)

  const handleSubmit = (event) => {
    setRerender(!rerender)
    event.preventDefault()
    connection
      .invoke('SendMessage', currentRoom.id, user.userId, message)
      .catch((err) => console.error(err.toString()))
    setMessage('')
  }

  const fetchMessages = (url) => {
    const source = axios.CancelToken.source()
    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchMessages(url)
    connection.on(
      'ReceiveMessage',
      (user, avatar, message, roomId, messageId, postedAt) => {
        receiveMessage(
          user,
          avatar,
          message,
          roomId,
          messageId,
          postedAt,
          roomId
        )
      }
    )
  }, [roomId, currentRoom, rerender])

  return (
    <div className="message-list">
      {!roomId ? (
        <div className="join-room">Join a room to start chatting.</div>
      ) : (
        <div>
          {messages &&
            messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  avatar={message.avatar}
                  userName={message.user_Name}
                  contents={message.contents}
                  postedAt={message.posted_At}
                />
              )
            })}
        </div>
      )}
      {currentRoom && (
        <AddMessageForm
          setMessage={setMessage}
          message={message}
          room={currentRoom}
          userName={'userName'}
          connection={connection}
          handleSubmit={(e) => handleSubmit(e)}
        />
      )}
    </div>
  )
}

export default MessageList
