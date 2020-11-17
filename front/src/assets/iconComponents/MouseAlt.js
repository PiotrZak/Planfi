import * as React from "react";

function SvgMouseAlt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 6a1 1 0 00-1 1v2a1 1 0 002 0V7a1 1 0 00-1-1zm0-4a7 7 0 00-7 7v6a7 7 0 0014 0V9a7 7 0 00-7-7zm5 13a5 5 0 01-10 0V9a5 5 0 0110 0z" />
    </svg>
  );
}

export default SvgMouseAlt;
