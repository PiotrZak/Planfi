import * as React from "react";

function SvgCheckSquare(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M10.21 14.75a1 1 0 001.42 0l4.08-4.08a1 1 0 00-1.42-1.42l-3.37 3.38-1.21-1.22a1 1 0 00-1.42 1.42zM21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 18H4V4h16z" />
    </svg>
  );
}

export default SvgCheckSquare;
