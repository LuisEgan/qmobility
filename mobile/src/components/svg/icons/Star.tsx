import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Star = (props: ISVG) => {
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
        d="M10,14.375,4.8438,17.5l1.3671-5.8594L1.68,7.6953l5.9765-.5078L10,1.68l2.3438,5.5078,5.9765.5078-4.5312,3.9453L15.1562,17.5Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Star.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Star;
