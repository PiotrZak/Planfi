import * as React from "react";

function SvgPlusSquare(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M9 13h2v2a1 1 0 002 0v-2h2a1 1 0 000-2h-2V9a1 1 0 00-2 0v2H9a1 1 0 000 2zM21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 18H4V4h16z" />
    </svg>
  );
}

export default SvgPlusSquare;
