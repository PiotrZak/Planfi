
import {
  REQUEST_ROOMS_PENDING,
  REQUEST_ROOMS_SUCCESS,
  REQUEST_ROOMS_FAILED,
  SET_ROOM,
  RECEIVE_ROOM
} from './actionTypes';

import useFetch from '../../hooks/useFetch'

export const setRoom = (room) => ({ type: SET_ROOM, payload: room })

export const requestRooms = () => (dispatch) => {
  dispatch({ type: REQUEST_ROOMS_PENDING })

  const { data: quote, loading, error } = useFetch('http://localhost:5005/api/ChatRoom')

  console.log(quote)
  // .then(data => dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: data }))
  // .catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))
}

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