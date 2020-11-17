import * as React from "react";

function SvgParagraph(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M13 13.5H3a1 1 0 000 2h10a1 1 0 000-2zm8-5H3a1 1 0 000 2h18a1 1 0 000-2z" />
    </svg>
  );
}

export default SvgParagraph;
