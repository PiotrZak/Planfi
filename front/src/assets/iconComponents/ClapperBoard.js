import * as React from "react";

function SvgClapperBoard(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M19 2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm-2.91 2l-4 4H7.91l4-4zM4 5a1 1 0 011-1h4.09l-4 4H4zm16 14a1 1 0 01-1 1H5a1 1 0 01-1-1v-9h16zm0-11h-5.09l4-4H19a1 1 0 011 1z" />
    </svg>
  );
}

export default SvgClapperBoard;
