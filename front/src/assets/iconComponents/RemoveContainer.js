import * as React from "react";

function SvgRemoveContainer(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x={0.5} y={0.5} width={15} height={15} rx={7.5} fill="#DA2B4B" />
      <path
        d="M11.205 11.205a.44.44 0 000-.623L8.623 8l2.582-2.582a.44.44 0 10-.623-.622L8 7.378 5.418 4.796a.44.44 0 10-.622.622L7.378 8l-2.582 2.582a.44.44 0 10.622.623L8 8.623l2.582 2.582a.44.44 0 00.623 0z"
        fill="#fff"
      />
      <rect x={0.5} y={0.5} width={15} height={15} rx={7.5} stroke="#fff" />
    </svg>
  );
}

export default SvgRemoveContainer;
