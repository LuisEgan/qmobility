import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const ArrowChange = (props: ISVG) => {
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
        d="M7.5,2.5l3.32,3.32H8.32V11.68H6.68V5.82H4.18Zm5.82,11.68h2.5L12.5,17.5,9.18,14.18h2.5V8.32H13.32Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

ArrowChange.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default ArrowChange;
