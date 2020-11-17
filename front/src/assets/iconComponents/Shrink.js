import * as React from "react";

function SvgShrink(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M10.71 11.29l-2.5-2.5a1 1 0 10-1.42 1.42l.8.79H3a1 1 0 000 2h4.59l-.8.79a1 1 0 000 1.42 1 1 0 001.42 0l2.5-2.5a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33zM21 11h-4.59l.8-.79a1 1 0 00-1.42-1.42l-2.5 2.5a1 1 0 00-.21.33 1 1 0 000 .76 1 1 0 00.21.33l2.5 2.5a1 1 0 001.42 0 1 1 0 000-1.42l-.8-.79H21a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgShrink;
