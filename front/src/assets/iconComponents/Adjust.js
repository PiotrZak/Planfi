import * as React from "react";

function SvgAdjust(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 17.93a8 8 0 010-15.86zm2 0V4.07a8 8 0 010 15.86z" />
    </svg>
  );
}

export default SvgAdjust;
