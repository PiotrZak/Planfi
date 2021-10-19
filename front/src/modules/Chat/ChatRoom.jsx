import React, { useEffect, useCallback } from "react";
import { receiveRoom, setRoom } from "store/actions/roomActions";
import { useDispatch } from 'react-redux'
import { useQuery, gql } from '@apollo/client';
import Loader from 'components/atoms/Loader';

const CHATROOM = gql`{
    chatRooms
    {
		name
      	id
     }
    }
  `;

const ChatRoomList = ({ openRoom, connection }) => {
  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(CHATROOM);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  const dispatch = useDispatch()

  useEffect(() => {
    refreshData();
    data && dispatch(setRoom(data.chatRooms[0]));
    connection.on("NewRoom", (roomName, roomId) => {
      receiveRoom(roomName, roomId);
    });
  }, [data,refreshData]);

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

  return (
    <div className="rooms-list">
      <ul>
        <h4>Rooms Available</h4>
        {data && data.chatRooms.map((room) => {
          return (
            <li key={room.id} className={"room"}>
              <a onClick={() => dispatch(setRoom(room))} href="#active">
                {room.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatRoomList;