import * as React from "react";

function SvgBolt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M19.87 8.6A1 1 0 0019 8h-4.58l1.27-4.74a1 1 0 00-.17-.87 1 1 0 00-.79-.39h-7a1 1 0 00-1 .74l-2.68 10a1 1 0 00.17.87 1 1 0 00.8.39h3.87l-1.81 6.74a1 1 0 001.71.93l10.9-12a1 1 0 00.18-1.07zm-9.79 8.68l1.07-4a1 1 0 00-.17-.87 1 1 0 00-.79-.39H6.35L8.49 4h4.93l-1.27 4.74a1 1 0 001 1.26h3.57z" />
    </svg>
  );
}

export default SvgBolt;
