import * as React from "react";

function SvgSpin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M13 3a7 7 0 000 14 5 5 0 000-10 3 3 0 000 6 1 1 0 000-2 1 1 0 010-2 3 3 0 010 6 5 5 0 010-10 7 7 0 010 14 9 9 0 01-9-9 1 1 0 00-2 0 11 11 0 0011 11 9 9 0 000-18z" />
    </svg>
  );
}

export default SvgSpin;
