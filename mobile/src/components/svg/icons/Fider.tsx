import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Fider = (props: ISVG) => {
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
        d="M5.293,14.707A6.4223,6.4223,0,0,1,3.32,10,6.4253,6.4253,0,0,1,5.293,5.293,6.4262,6.4262,0,0,1,10,3.32,6.4292,6.4292,0,0,1,14.707,5.293,6.4292,6.4292,0,0,1,16.68,10a6.4262,6.4262,0,0,1-1.9727,4.707A6.4253,6.4253,0,0,1,10,16.68,6.4223,6.4223,0,0,1,5.293,14.707Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Fider.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Fider;
