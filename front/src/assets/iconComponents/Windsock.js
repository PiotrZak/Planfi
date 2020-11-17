import * as React from "react";

function SvgWindsock(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M18.08 5L10 4.33l-3-.25V3a1 1 0 00-2 0v18a1 1 0 002 0v-7.08l3-.25 8.08-.67a1 1 0 00.92-1V6a1 1 0 00-.92-1zM9 11.75l-2 .16V6.09l2 .16zm4-.34l-2 .17V6.42l2 .17zm4-.33l-2 .17v-4.5l2 .17z" />
    </svg>
  );
}

export default SvgWindsock;
