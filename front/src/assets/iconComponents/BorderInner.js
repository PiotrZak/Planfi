import * as React from "react";

function SvgBorderInner(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M8 5a1 1 0 10-1-1 1 1 0 001 1zM4 9a1 1 0 10-1-1 1 1 0 001 1zm0-4a1 1 0 10-1-1 1 1 0 001 1zm0 14a1 1 0 101 1 1 1 0 00-1-1zM20 5a1 1 0 10-1-1 1 1 0 001 1zm0 4a1 1 0 10-1-1 1 1 0 001 1zm-4-4a1 1 0 10-1-1 1 1 0 001 1zm4 14a1 1 0 101 1 1 1 0 00-1-1zM4 15a1 1 0 101 1 1 1 0 00-1-1zm16 0a1 1 0 101 1 1 1 0 00-1-1zm-4 4a1 1 0 101 1 1 1 0 00-1-1zm5-7a1 1 0 00-1-1h-7V4a1 1 0 00-2 0v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 001-1zM8 19a1 1 0 101 1 1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgBorderInner;
