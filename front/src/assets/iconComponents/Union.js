import * as React from "react";

function SvgUnion(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.768 11.768a.793.793 0 000-1.12L7.12 6l4.648-4.648a.792.792 0 00-1.12-1.12L6 4.88 1.352.232a.792.792 0 10-1.12 1.12L4.88 6 .232 10.648a.792.792 0 001.12 1.12L6 7.12l4.648 4.648c.309.31.81.31 1.12 0z"
        fill="#222"
      />
    </svg>
  );
}

export default SvgUnion;
