import React from "react";
import { Comment, Tooltip } from 'antd';
import Avatar from "components/molecules/Avatar";
import {formatDistance,parseISO} from 'date-fns'

const getDateString = dateVal => {
  const date = new Date(dateVal);
  return date.toLocaleDateString() + " at " +
    date.toLocaleTimeString();
}

const lastWord =(words) =>{
  var n = words.split(/[\s,]+/) ;
  return n[n.length - 1];
}

const Message = (props) => {
  const firstName = props.userName.split(" ")[0];
  const lastName = lastWord(props.userName);

  return (
    <>
      <Comment
        author={<a>{props.userName}</a>}
        avatar={<Avatar avatar={props.avatar} firstName={firstName} lastName={lastName} />}
        content={
          <p>
            {props.contents}
          </p>
        }
        datetime={
          <Tooltip title={getDateString(props.postedAt)}>
            <span>{formatDistance(parseISO(props.postedAt), new Date())}</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default Message;