import * as React from "react";

function SvgLineSpacing(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M6.29 9.71a1 1 0 001.42 0 1 1 0 000-1.42l-2-2a1 1 0 00-.33-.21 1 1 0 00-.76 0 1 1 0 00-.33.21l-2 2a1 1 0 001.42 1.42l.29-.3v5.18l-.29-.3a1 1 0 00-1.42 1.42l2 2a1 1 0 00.33.21.94.94 0 00.76 0 1 1 0 00.33-.21l2-2a1 1 0 00-1.42-1.42l-.29.3V9.41zM11 8h10a1 1 0 000-2H11a1 1 0 000 2zm10 3H11a1 1 0 000 2h10a1 1 0 000-2zm0 5H11a1 1 0 000 2h10a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgLineSpacing;
