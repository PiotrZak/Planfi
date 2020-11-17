import * as React from "react";

function SvgWebGrid(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-7 18H4v-7h10zm0-9H4V4h10zm6 9h-4V4h4z" />
    </svg>
  );
}

export default SvgWebGrid;
