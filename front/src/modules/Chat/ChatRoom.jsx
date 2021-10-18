
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { requestRooms, receiveRoom, setRoom } from 'store/actions/roomActions';

const ChatRoomList = ({openRoom, connection}) => {

    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        requestRooms();

        connection.on(
          "NewRoom",
          (roomName, roomId) =>
          {
            this.props.onReceiveRoom(
              roomName,
              roomId
            )
          }
        )
      }, []);

    return (
      <div className="rooms-list">
        <ul>
          <h4>Rooms Available</h4>
            {rooms.map(room => {
              
              return (
                <li key={room.id} className={'room'}>
                  <a
                    onClick={() => this.props.onSetRoom(room)} href="#active">
                    {room.name}
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    rooms: state.requestRooms.rooms,
    currentRoom: state.requestRooms.currentRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestRooms: () => dispatch(requestRooms()),
    onReceiveRoom: (roomName, id) =>
      dispatch(receiveRoom(roomName,id)
      ),
    onSetRoom: (room) => dispatch(setRoom(room))
  }
}

const ChatRoom = ({name, peopleInside, selected}) => (
  <div>
    <h3>{name}</h3>
    <p>{peopleInside}</p>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomList);