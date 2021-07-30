import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CompassWithCircles = (props: ISVG) => {
  const { fill } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 238 238"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <G transform="translate(-69 -168)">
        <Circle
          opacity={0.048}
          fill="#fff"
          cx="119"
          cy="119"
          r="119"
          transform="translate(69 168)"
        />
        <Circle
          opacity={0.082}
          fill="#fff"
          cx="82"
          cy="82"
          r="82"
          transform="translate(106 205)"
        />
        <Circle
          opacity={0.1}
          fill="#fff"
          cx="46"
          cy="46"
          r="46"
          transform="translate(142 241)"
        />
        <G transform="translate(164 263)">
          <Path
            fill="#fff"
            d="M24,46A22,22,0,1,1,46,24,22,22,0,0,1,24,46Zm0-4A18,18,0,1,0,6,24,18,18,0,0,0,24,42ZM18.451,17.077l14-4a2,2,0,0,1,2.472,2.472l-4,14a2,2,0,0,1-1.374,1.374l-14,4a2,2,0,0,1-2.472-2.472l4-14A2,2,0,0,1,18.451,17.077Zm-.539,13.011,9.47-2.706,2.706-9.47-9.47,2.706ZM24,26a2,2,0,1,1,2-2A2,2,0,0,1,24,26Z"
          />
        </G>
      </G>
    </Svg>
  );
};

CompassWithCircles.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CompassWithCircles;
