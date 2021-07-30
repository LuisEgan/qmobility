import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Plus = (props: ISVG) => {
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
        d="M9.1719,10.2588V14.56H6.8311V10.2588h-4.32v-2.32h4.32V3.6377H9.1719V7.9385h4.32v2.32Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Plus.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Plus;
