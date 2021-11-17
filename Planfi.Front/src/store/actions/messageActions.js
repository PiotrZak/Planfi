import { RECEIVE_MESSAGE } from './actionTypes'

export function receiveMessage(
  userName = '',
  message = '',
  roomId = null,
  id = null,
  postedAt = null,
  currentRoomId = null
) {
  const filteredMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      message: {
        userName,
        id,
        roomId,
        postedAt,
        contents: filteredMessage,
      },
      currentRoomId,
    },
  }
}
