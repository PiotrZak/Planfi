import * as React from "react";

function SvgCommentCheck(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M13.29 7.13a1 1 0 000 1.42l1.92 1.92a1 1 0 001.42 0l4.08-4.08A1 1 0 1019.29 5l-3.37 3.35-1.21-1.22a1 1 0 00-1.42 0zm6.62 3.51a1 1 0 00-.91 1.08 2.62 2.62 0 010 .28 7 7 0 01-7 7H6.41l.64-.63a1 1 0 000-1.41 7 7 0 013.48-11.81 7.14 7.14 0 012.8 0 1 1 0 10.4-2 9.15 9.15 0 00-3.61 0A9.05 9.05 0 003 12a9 9 0 002 5.62l-1.71 1.67a1 1 0 00-.21 1.09A1 1 0 004 21h8a9 9 0 009-9v-.44a1 1 0 00-1.09-.92z" />
    </svg>
  );
}

export default SvgCommentCheck;
