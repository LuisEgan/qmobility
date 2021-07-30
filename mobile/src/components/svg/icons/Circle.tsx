import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Circle = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path
        d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Circle.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Circle;
