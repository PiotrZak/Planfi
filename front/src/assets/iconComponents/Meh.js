import * as React from "react";

function SvgMeh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M9 11a1 1 0 10-1-1 1 1 0 001 1zm6 3H9a1 1 0 000 2h6a1 1 0 000-2zm0-5a1 1 0 101 1 1 1 0 00-1-1zm-3-7a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
    </svg>
  );
}

export default SvgMeh;
