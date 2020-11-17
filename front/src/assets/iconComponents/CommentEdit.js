import * as React from "react";

function SvgCommentEdit(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21.71 4.72l-2.43-2.43a1 1 0 00-1.41 0l-5.58 5.58a1 1 0 00-.29.71V11a1 1 0 001 1h2.42a1 1 0 00.71-.29l5.58-5.58a1 1 0 000-1.41zM15 10h-1V9l4.58-4.58 1 1zm4 2a1 1 0 00-1 1 7 7 0 01-7 7H5.41l.64-.63a1 1 0 000-1.42A7 7 0 0111 6a1 1 0 000-2 9 9 0 00-7 14.62l-1.71 1.67a1 1 0 00-.21 1.09A1 1 0 003 22h8a9 9 0 009-9 1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgCommentEdit;
