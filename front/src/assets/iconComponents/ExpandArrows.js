import * as React from "react";

function SvgExpandArrows(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 8a1 1 0 001-1V3a1 1 0 00-.08-.38 1 1 0 00-.54-.54A1 1 0 0021 2h-4a1 1 0 000 2h1.59L12 10.59 5.41 4H7a1 1 0 000-2H3a1 1 0 00-.38.08 1 1 0 00-.54.54A1 1 0 002 3v4a1 1 0 002 0V5.41L10.59 12 4 18.59V17a1 1 0 00-2 0v4a1 1 0 00.08.38 1 1 0 00.54.54A1 1 0 003 22h4a1 1 0 000-2H5.41L12 13.41 18.59 20H17a1 1 0 000 2h4a1 1 0 00.38-.08 1 1 0 00.54-.54A1 1 0 0022 21v-4a1 1 0 00-2 0v1.59L13.41 12 20 5.41V7a1 1 0 001 1z" />
    </svg>
  );
}

export default SvgExpandArrows;
