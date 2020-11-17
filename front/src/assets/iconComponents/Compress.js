import * as React from "react";

function SvgCompress(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M16 9h5a1 1 0 000-2h-4V3a1 1 0 00-2 0v5a1 1 0 001 1zm-8 6H3a1 1 0 000 2h4v4a1 1 0 002 0v-5a1 1 0 00-1-1zM8 2a1 1 0 00-1 1v4H3a1 1 0 000 2h5a1 1 0 001-1V3a1 1 0 00-1-1zm13 13h-5a1 1 0 00-1 1v5a1 1 0 002 0v-4h4a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgCompress;
