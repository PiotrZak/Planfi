import * as React from "react";

function SvgPackage(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M19 2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm-9 2h4v3.13l-1.45-1a1 1 0 00-1.1 0l-1.45 1zm10 15a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3v5a1 1 0 00.53.88 1 1 0 001-.05L12 8.2l2.45 1.63A1 1 0 0016 9V4h3a1 1 0 011 1z" />
    </svg>
  );
}

export default SvgPackage;
