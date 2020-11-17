import * as React from "react";

function SvgAlignCenter(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M3 7h18a1 1 0 000-2H3a1 1 0 000 2zm4 2a1 1 0 000 2h10a1 1 0 000-2zm14 4H3a1 1 0 000 2h18a1 1 0 000-2zm-4 4H7a1 1 0 000 2h10a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgAlignCenter;
