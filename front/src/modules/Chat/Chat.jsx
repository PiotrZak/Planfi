import React, { useState, useEffect } from 'react';

const ChatContainer = () => {

    const handlePanelRef = (div) => {
        this.panel = div;
    }

    const registerUserLoggedOn = (userLoggedOn (id, name)) => {
        // get new user from the server
        this._connection.on('UserLoggedOn', (id, name) => {
            userLoggedOn(id, name);
        });
    }

    const registerMessageAdded = (messageAdded (msg)) =>  {
        // get nre chat message from the server
        this._connection.on('MessageAdded', (message) => {
            messageAdded(message);
        });
    }
    
    sendMessage(message) {
        // send the chat message to the server
        this._connection.invoke('AddMessage', message);
    }

    //Chat.tsx
    let that = this;
    this._chatService = new ChatService((msg) => {
        this.handleOnSocket(that, msg);
    });

    const handleOnSocket = (that, message) => {
        let messages = that.state.messages;
        messages.push(message);
        that.setState({
            messages: messages,
            currentMessage: ''
        });
        that.scrollDown(that);
        that.focusField(that);
    }


    const handleMessageRef = (input) =>{
        this.msg = input;
    }

    const handleMessageChange = (event) => {
        this.setState({ currentMessage: event.target.value });
    }

    const addMessage = () => {
        let currentMessage = this.state.currentMessage;
        if (currentMessage.length === 0) {
            return;
        }
        let id = this.state.messages.length;
        let date = new Date();
    
        let messages = this.state.messages;
        messages.push({
            id: id,
            date: date,
            message: currentMessage,
            sender: 'juergen'
        })
        this.setState({
            messages: messages,
            currentMessage: ''
        });
        this.msg.focus();
        this.panel.scrollTop = this.panel.scrollHeight - this.panel.clientHeight;
    }

return (
<div className='panel panel-default'>
<div className='panel-body panel-chat'
    ref={this.handlePanelRef}>
    <ul>
        {this.state.messages.map(message =>
            <li key={message.id}><strong>{message.sender} </strong>
                ({moment(message.date).format('HH:mm:ss')})<br />
                {message.message}</li>
        )}
    </ul>
</div>
<div className='panel-footer'>
    <form className='form-inline' onSubmit={this.onSubmit}>
        <label className='sr-only' htmlFor='msg'>Message</label>
        <div className='input-group col-md-12'>
            <button className='chat-button input-group-addon'>:-)</button>
            <input type='text' value={this.state.currentMessage}
                onChange={this.handleMessageChange}
                className='form-control'
                id='msg'
                placeholder='Your message'
                ref={this.handleMessageRef} />
            <button className='chat-button input-group-addon'>Send</button>
        </div>
    </form>
</div>
</div>
)}

const ChatUsers = () => {

    const users = [
        { id: 1, name: 'juergen' },
        { id: 3, name: 'marion' },
        { id: 2, name: 'peter' },
        { id: 4, name: 'mo' }
    ]

    return(
             <div className='panel panel-default'>
                <div className='panel-body'>
                    <h3>Users online:</h3>
                    <ul className='chat-users'>
                        {users.map(user =>
                            <li key={user.id}>{user.name}</li>
                        )}
                    </ul>
                </div>
            </div>
    )
        }
