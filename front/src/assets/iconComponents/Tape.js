import * as React from "react";

function SvgTape(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M14.5 7a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2zm1-10h-2a7 7 0 00-7 7v3h-1a1 1 0 000 2h1v2h-4a1 1 0 00-1 1v2a1 1 0 002 0v-1h12a7 7 0 007-7v-2a7 7 0 00-7-7zm5 9a5 5 0 01-5 5h-7v-7a5 5 0 015-5h2a5 5 0 015 5z" />
    </svg>
  );
}

export default SvgTape;
