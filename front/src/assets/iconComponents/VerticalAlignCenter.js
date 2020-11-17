import * as React from "react";

function SvgVerticalAlignCenter(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 11h-3V6a1 1 0 00-1-1h-3V3a1 1 0 00-1-1H7a1 1 0 00-1 1v8H3a1 1 0 000 2h3v8a1 1 0 001 1h6a1 1 0 001-1v-2h3a1 1 0 001-1v-5h3a1 1 0 000-2zm-9 9H8V4h4zm4-3h-2V7h2z" />
    </svg>
  );
}

export default SvgVerticalAlignCenter;
