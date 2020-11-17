import * as React from "react";

function SvgBorderOut(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 9a1 1 0 10-1-1 1 1 0 001 1zm0 4a1 1 0 10-1-1 1 1 0 001 1zm4 0a1 1 0 10-1-1 1 1 0 001 1zm-4 4a1 1 0 10-1-1 1 1 0 001 1zm8-14H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zm-1 16H5V5h14zM8 13a1 1 0 10-1-1 1 1 0 001 1z" />
    </svg>
  );
}

export default SvgBorderOut;
