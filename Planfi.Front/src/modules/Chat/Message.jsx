import React from 'react'
import { Comment, Tooltip } from 'antd'
import Avatar from 'components/molecules/Avatar'
import { formatDistance, parseISO } from 'date-fns'

const getDateString = (dateVal) => {
  const date = new Date(dateVal)
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
}

const lastWord = (words) => {
  var n = words.split(/[\s,]+/)
  return n[n.length - 1]
}

const Message = (props) => {

  const firstName = props.userName.split(' ')[0]
  const lastName = lastWord(props.userName)

  console.log(props.postedAtUtc)
  console.log()

  return (
    <>
      <Comment
        author={<a>{props.userName}</a>}
        avatar={
          <Avatar
            userId = {props.userId}
            avatar={props.avatar}
            firstName={firstName}
            lastName={lastName}
          />
        }
        content={<p>{props.contents}</p>}
        datetime={
          <Tooltip title={getDateString(props.postedAtUtc)}>
            <span>{formatDistance(parseISO(props.postedAtUtc), new Date())}</span>
          </Tooltip>
        }
      />
    </>
  )
}

export default Message
