import React from "react";
import Svg, { Circle } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Bubble = (props: ISVG) => {
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
      <Circle fill={fill} stroke={stroke} cx="7.2" cy="14.4" r="3.2" />
      <Circle fill={fill} stroke={stroke} cx="14.8" cy="18" r="2" />
      <Circle fill={fill} stroke={stroke} cx="15.2" cy="8.8" r="4.8" />
    </Svg>
  );
};

Bubble.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Bubble;
