import React, { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import ChatRoomList from "./ChatRoom";
import { HubConnectionBuilder } from "@microsoft/signalr";

const ChatContainer = () => {
  const [connection, setConnection] = useState();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://chatappwithsignalr.azurewebsites.net/chatHub")
      .build();

    console.log(connection);

    setConnection(connection);

    connection
      .start({ withCredentials: false })
      .catch((err) => console.error(err.toString()));
  }, []);

  return (
    <div className="panel panel-default">
      {connection && (
        <ChatRoomList openRoom={() => 1} connection={connection} />
      )}

      {/* {currentRoom ? (
        <MessageList roomId={currentRoom.id} connection={this.connection} />
      ) : (
        <NoRoomSelected />
      )}


      {userName ? (
        <AddMessageForm
          roomId={currentRoom.id}
          userName={userName}
          connection={this.connection}
        />
      ) : currentRoom ? (
        <UserNameForm onSetUserName={onSetUserName} />
      ) : (
        <div> Pick a room.</div>
      )}
      <AddChatRoomForm connection={this.connection} /> */}
    </div>
  );
};

export default ChatContainer;
