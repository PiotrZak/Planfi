import * as React from "react";

function SvgInfo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 10a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1zm0-4a1.25 1.25 0 101.25 1.25A1.25 1.25 0 0012 6z" />
    </svg>
  );
}

export default SvgInfo;
