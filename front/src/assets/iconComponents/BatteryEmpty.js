import * as React from "react";

function SvgBatteryEmpty(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M17 7H4a2 2 0 00-2 2v6a2 2 0 002 2h13a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H4V9h13zm4-5a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgBatteryEmpty;
