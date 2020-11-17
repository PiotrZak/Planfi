import * as React from "react";

function SvgSubject(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M13 16H3a1 1 0 000 2h10a1 1 0 000-2zM3 8h18a1 1 0 000-2H3a1 1 0 000 2zm18 3H3a1 1 0 000 2h18a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgSubject;
