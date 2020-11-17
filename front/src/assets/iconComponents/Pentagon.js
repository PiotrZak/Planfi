import * as React from "react";

function SvgPentagon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21.59 9.17l-9-6.54a1 1 0 00-1.18 0l-9 6.54a1 1 0 00-.36 1.12l3.44 10.58a1 1 0 001 .69h11.07a1 1 0 001-.69L22 10.29a1 1 0 00-.41-1.12zm-4.75 10.39H7.16l-3-9.2L12 4.68l7.82 5.68z" />
    </svg>
  );
}

export default SvgPentagon;
