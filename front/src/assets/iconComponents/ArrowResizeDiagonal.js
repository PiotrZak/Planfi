import * as React from "react";

function SvgArrowResizeDiagonal(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21.92 2.62a1 1 0 00-.54-.54A1 1 0 0021 2h-6a1 1 0 000 2h3.59L4 18.59V15a1 1 0 00-2 0v6a1 1 0 00.08.38 1 1 0 00.54.54A1 1 0 003 22h6a1 1 0 000-2H5.41L20 5.41V9a1 1 0 002 0V3a1 1 0 00-.08-.38z" />
    </svg>
  );
}

export default SvgArrowResizeDiagonal;
