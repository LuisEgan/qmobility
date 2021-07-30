/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Map = (props: ISVG) => {
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
        d="M17.07,2.5a.38.38,0,0,1,.43.43V15.5078a.3688.3688,0,0,1-.3125.3906L12.5,17.5l-5-1.7578L3.0469,17.4609,2.93,17.5a.3793.3793,0,0,1-.43-.43V4.4922a.3693.3693,0,0,1,.3125-.3906L7.5,2.5l5,1.7578,4.4531-1.7187ZM12.5,15.82V5.9375L7.5,4.18v9.8828Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Map.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Map;
