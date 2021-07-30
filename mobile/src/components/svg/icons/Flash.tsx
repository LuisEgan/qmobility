import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Flash = (props: ISVG) => {
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
        d="M5.82,1.68H14.18L10.82,8.32H14.18L8.32,18.32v-7.5H5.82Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Flash.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Flash;
