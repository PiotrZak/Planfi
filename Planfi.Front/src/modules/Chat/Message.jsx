import React, { useEffect, useState } from "react";
import { Comment, Tooltip, Avatar } from 'antd';

const getDateString = dateVal => {
  const date = new Date(dateVal);
  return date.toLocaleDateString() + " at " +
    date.toLocaleTimeString();
}


const Message = (props) => {
  return (
    <>
      <Comment
        author={<a>{props.userName}</a>}
        //todo - add user avatar
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <p>
          {props.content}
          </p>
        }
        // datetime={
        //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        //     <span>{getDateString(props.postedAt).fromNow()}</span>
        //   </Tooltip>
        // }
      />
    </>
    // <div className="message">
    //   <div className="message-username">
    //     {props.userName} ~ 
    //     <b>{getDateString(props.postedAt)}</b>
    //   </div>
    //   <div className="message-text">{props.contents}</div>
    // </div>
  );
};

export default Message;