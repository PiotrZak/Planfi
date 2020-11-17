import * as React from "react";

function SvgCompressPoint(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21.71 20.29L15.41 14H17a1 1 0 000-2h-3.59l5.66-5.66a1 1 0 10-1.41-1.41L12 10.59V7a1 1 0 00-2 0v1.59l-6.29-6.3a1 1 0 00-1.42 1.42L8.59 10H7a1 1 0 000 2h3.59l-5.66 5.66a1 1 0 000 1.41 1 1 0 001.41 0L12 13.41V17a1 1 0 002 0v-1.59l6.29 6.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
    </svg>
  );
}

export default SvgCompressPoint;
