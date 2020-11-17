import * as React from "react";

function SvgRainbow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M5 12a1 1 0 000 2 5 5 0 015 5 1 1 0 002 0 7 7 0 00-7-7zm0-8a1 1 0 000 2 13 13 0 0113 13 1 1 0 002 0A15 15 0 005 4zm0 4a1 1 0 000 2 9 9 0 019 9 1 1 0 002 0A11 11 0 005 8z" />
    </svg>
  );
}

export default SvgRainbow;
