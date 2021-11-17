
import {
  SET_ROOM,
  RECEIVE_ROOM
} from './actionTypes';

export const setRoom = (room) => ({ type: SET_ROOM, payload: room })

export function receiveRoom(
  name = "",
  id = null
) {
  return {
    type: RECEIVE_ROOM,
    payload: {
      room: {
        id,
        name
      }
    }
  }
}