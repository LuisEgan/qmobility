/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IEdit {
  fill: string | number;
  stroke: string | number;
}

const Edit = (props: IEdit) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Edit.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default Edit;
