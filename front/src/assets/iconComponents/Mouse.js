import * as React from "react";

function SvgMouse(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 2a7 7 0 00-7 7v6a7 7 0 0014 0V9a7 7 0 00-7-7zM7 9a5 5 0 014-4.9V10H7zm10 6a5 5 0 01-10 0v-3h10zm0-5h-4V4.1A5 5 0 0117 9z" />
    </svg>
  );
}

export default SvgMouse;
