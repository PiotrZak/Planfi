import * as React from "react";

function SvgCelsius(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 19h-6a3 3 0 01-3-3V8a3 3 0 013-3h6a1 1 0 000-2h-6a5 5 0 00-5 5v8a5 5 0 005 5h6a1 1 0 000-2zM5 3a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1z" />
    </svg>
  );
}

export default SvgCelsius;
