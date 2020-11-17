import * as React from "react";

function SvgAnalytics(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M5 12a1 1 0 00-1 1v8a1 1 0 002 0v-8a1 1 0 00-1-1zm5-10a1 1 0 00-1 1v18a1 1 0 002 0V3a1 1 0 00-1-1zm10 14a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zm-5-8a1 1 0 00-1 1v12a1 1 0 002 0V9a1 1 0 00-1-1z" />
    </svg>
  );
}

export default SvgAnalytics;
