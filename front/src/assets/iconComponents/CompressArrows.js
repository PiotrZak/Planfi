import * as React from "react";

function SvgCompressArrows(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M10.38 13.08A1 1 0 0010 13H6a1 1 0 000 2h1.59l-5.3 5.29a1 1 0 000 1.42 1 1 0 001.42 0L9 16.41V18a1 1 0 002 0v-4a1 1 0 00-.08-.38 1 1 0 00-.54-.54zM10 5a1 1 0 00-1 1v1.59l-5.29-5.3a1 1 0 00-1.42 1.42L7.59 9H6a1 1 0 000 2h4a1 1 0 00.38-.08 1 1 0 00.54-.54A1 1 0 0011 10V6a1 1 0 00-1-1zm3.62 5.92A1 1 0 0014 11h4a1 1 0 000-2h-1.59l5.3-5.29a1 1 0 10-1.42-1.42L15 7.59V6a1 1 0 00-2 0v4a1 1 0 00.08.38 1 1 0 00.54.54zM16.41 15H18a1 1 0 000-2h-4a1 1 0 00-.38.08 1 1 0 00-.54.54A1 1 0 0013 14v4a1 1 0 002 0v-1.59l5.29 5.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
    </svg>
  );
}

export default SvgCompressArrows;
