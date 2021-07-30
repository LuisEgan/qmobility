import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Navigation = (props: ISVG) => {
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
        d="M10,1.68l6.25,15.2344-.5859.5859L10,15,4.3359,17.5,3.75,16.9141Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Navigation.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Navigation;
