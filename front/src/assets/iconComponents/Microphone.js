import * as React from "react";

function SvgMicrophone(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M12 15a4 4 0 004-4V5a4 4 0 00-8 0v6a4 4 0 004 4zM10 5a2 2 0 014 0v6a2 2 0 01-4 0zm10 6a1 1 0 00-2 0 6 6 0 01-12 0 1 1 0 00-2 0 8 8 0 007 7.93V21H9a1 1 0 000 2h6a1 1 0 000-2h-2v-2.07A8 8 0 0020 11z" />
    </svg>
  );
}

export default SvgMicrophone;
