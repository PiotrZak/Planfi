import * as React from "react";

function SvgGrid(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zM11 20H4v-4h7zm0-6H4v-4h7zm9 6h-7v-4h7zm0-6h-7v-4h7zm0-6H4V4h16z" />
    </svg>
  );
}

export default SvgGrid;
