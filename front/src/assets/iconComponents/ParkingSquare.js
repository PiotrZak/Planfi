import * as React from "react";

function SvgParkingSquare(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 6H9a1 1 0 00-1 1v10a1 1 0 002 0v-3h2a4 4 0 000-8zm0 6h-2V8h2a2 2 0 010 4zm7-10H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1z" />
    </svg>
  );
}

export default SvgParkingSquare;
