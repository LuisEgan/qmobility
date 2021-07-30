import React from "react";
import Svg, { Circle } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Dot = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 20 20"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Circle cx="10" cy="10" r="10" stroke={stroke} fill={fill} />
    </Svg>
  );
};

Dot.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default Dot;
