import * as React from "react";

function SvgHorizontalAlignCenter(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 10h-2V7a1 1 0 00-1-1h-5V3a1 1 0 00-2 0v3H6a1 1 0 00-1 1v3H3a1 1 0 00-1 1v6a1 1 0 001 1h8v3a1 1 0 002 0v-3h8a1 1 0 001-1v-6a1 1 0 00-1-1zM7 8h10v2H7zm13 8H4v-4h16z" />
    </svg>
  );
}

export default SvgHorizontalAlignCenter;
