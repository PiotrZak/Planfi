import * as React from "react";

function SvgBrushAlt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 18a1 1 0 101 1 1 1 0 00-1-1zm6-17H6a1 1 0 00-1 1v9a3 3 0 003 3h1v2.37a4 4 0 106 0V14h1a3 3 0 003-3V2a1 1 0 00-1-1zm-6 20a2 2 0 01-1.33-3.48 1 1 0 00.33-.74V14h2v2.78a1 1 0 00.33.74A2 2 0 0112 21zm5-10a1 1 0 01-1 1H8a1 1 0 01-1-1v-1h10zm0-3H7V3h10z" />
    </svg>
  );
}

export default SvgBrushAlt;
