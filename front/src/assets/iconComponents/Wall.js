import * as React from "react";

function SvgWall(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 9a1 1 0 000-2h-1V5h1a1 1 0 000-2H3a1 1 0 000 2h3v2H3a1 1 0 000 2h1v2H3a1 1 0 000 2h3v2H3a1 1 0 000 2h1v2H3a1 1 0 000 2h18a1 1 0 000-2h-3v-2h3a1 1 0 000-2h-1v-2h1a1 1 0 000-2h-3V9zM8 5h4v2H8zm8 4v2h-4V9zM6 9h4v2H6zm6 4v2H8v-2zm-2 6H6v-2h4zm6 0h-4v-2h4zm2-4h-4v-2h4zm-4-8V5h4v2z" />
    </svg>
  );
}

export default SvgWall;
