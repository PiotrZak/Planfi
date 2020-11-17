import * as React from "react";

function SvgObjectUngroup(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 18.28v-6.56A2 2 0 1018.28 9H15V5.72A2 2 0 1012.28 3H5.72A2 2 0 103 5.72v6.56A2 2 0 105.72 15H9v3.28A2 2 0 1011.72 21h6.56A2 2 0 1021 18.28zM8 10a2 2 0 001 1.72V13H5.72a1.91 1.91 0 00-.72-.72V5.72A1.91 1.91 0 005.72 5h6.56a1.91 1.91 0 00.72.72V9h-1.28A2 2 0 008 10zm5 1v1.28a1.91 1.91 0 00-.72.72H11v-1.28a1.91 1.91 0 00.72-.72zm6 7.28a1.91 1.91 0 00-.72.72h-6.56a1.91 1.91 0 00-.72-.72V15h1.28A2 2 0 1015 12.28V11h3.28a1.91 1.91 0 00.72.72z" />
    </svg>
  );
}

export default SvgObjectUngroup;
