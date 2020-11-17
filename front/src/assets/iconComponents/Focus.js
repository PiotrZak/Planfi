import * as React from "react";

function SvgFocus(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M8 2H3a1 1 0 00-1 1v5a1 1 0 002 0V4h4a1 1 0 000-2zm0 18H4v-4a1 1 0 00-2 0v5a1 1 0 001 1h5a1 1 0 000-2zM21 2h-5a1 1 0 000 2h4v4a1 1 0 002 0V3a1 1 0 00-1-1zm0 13a1 1 0 00-1 1v4h-4a1 1 0 000 2h5a1 1 0 001-1v-5a1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgFocus;
