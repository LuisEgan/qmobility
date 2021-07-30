import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const BatterySTD = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 20 21"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        fill={fill}
        stroke={stroke}
        d="M17.68,13.0469A1.1335,1.1335,0,0,1,16.5469,14.18H3.7734a1.03,1.03,0,0,1-.7812-.332,1.1243,1.1243,0,0,1-.3125-.8008V6.9531a1.1227,1.1227,0,0,1,.3125-.8008,1.0268,1.0268,0,0,1,.7812-.332H16.5469A1.1335,1.1335,0,0,1,17.68,6.9531V8.32H19.32V11.68H17.68Z"
      />
    </Svg>
  );
};

BatterySTD.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default BatterySTD;
