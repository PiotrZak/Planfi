import * as React from "react";

function SvgAnalysis(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21.71 7.29a1 1 0 00-1.42 0L14 13.59l-4.29-4.3a1 1 0 00-1.42 0l-6 6a1 1 0 000 1.42 1 1 0 001.42 0L9 11.41l4.29 4.3a1 1 0 001.42 0l7-7a1 1 0 000-1.42z" />
    </svg>
  );
}

export default SvgAnalysis;
