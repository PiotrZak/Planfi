import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { receiveRoom, setRoom } from "store/actions/roomActions";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from 'react-redux'


const ChatRoomList = ({ openRoom, connection }) => {
  const [rooms, setRooms] = useState([]);
  const {
    data,
    loading,
    error,
  } = useFetch("http://localhost:9001/api/ChatRoom");

  const dispatch = useDispatch()

  useEffect(() => {
    setRooms(data)
    data && dispatch(setRoom(data[0]));
    connection.on("NewRoom", (roomName, roomId) => {
      receiveRoom(roomName, roomId);
    });
  }, [data]);

  return (
    <div className="rooms-list">
      <ul>
        <h4>Rooms Available</h4>
        {rooms && rooms.map((room) => {
          return (
            <li key={room.id} className={"room"}>
              <div onClick={() => dispatch(setRoom(room))} href="#active">
                {room.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


const ChatRoom = ({ name, peopleInside, selected }) => (
  <div>
    <h3>{name}</h3>
    <p>{peopleInside}</p>
  </div>
);

export default ChatRoomList;