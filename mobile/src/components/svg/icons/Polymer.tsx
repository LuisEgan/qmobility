import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Polymer = (props: ISVG) => {
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
        d="M15.82,3.32,19.57,10l-3.75,6.68H12.5L16.25,10,14.0625,6.1328,7.5,16.68H4.18L.43,10,4.18,3.32H7.5L3.75,10l2.1875,3.8672L12.5,3.32Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Polymer.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Polymer;
