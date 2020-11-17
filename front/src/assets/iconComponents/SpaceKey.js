import * as React from "react";

function SvgSpaceKey(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 9a1 1 0 00-1 1v3H4v-3a1 1 0 00-2 0v4a1 1 0 001 1h18a1 1 0 001-1v-4a1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgSpaceKey;
