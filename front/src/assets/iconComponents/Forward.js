import * as React from "react";

function SvgForward(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M20.67 9.69L14 5.84a2.67 2.67 0 00-4 2.31L6 5.84a2.67 2.67 0 00-4 2.31v7.7a2.63 2.63 0 001.33 2.3 2.61 2.61 0 001.34.37A2.69 2.69 0 006 18.16l4-2.31a2.65 2.65 0 001.33 2.31 2.66 2.66 0 002.67 0l6.67-3.85a2.67 2.67 0 000-4.62zM10 13.54l-5 2.88a.67.67 0 01-1-.57v-7.7a.67.67 0 011-.57l5 2.88zm9.67-1L13 16.43a.69.69 0 01-.67 0 .66.66 0 01-.33-.58v-7.7a.66.66 0 01.33-.58.78.78 0 01.34-.09.63.63 0 01.33.09l6.67 3.85a.67.67 0 010 1.16z" />
    </svg>
  );
}

export default SvgForward;
