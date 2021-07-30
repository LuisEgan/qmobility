import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const MoreVert = (props: ISVG) => {
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
        d="M11.1719,6.1719a1.6062,1.6062,0,0,1-2.3438,0,1.6062,1.6062,0,0,1,0-2.3438,1.6062,1.6062,0,0,1,2.3438,0,1.6062,1.6062,0,0,1,0,2.3438ZM8.8281,8.8281a1.6576,1.6576,0,1,1,2.3438,2.3438A1.6576,1.6576,0,1,1,8.8281,8.8281Zm0,5A1.6062,1.6062,0,1,1,8.32,15,1.61,1.61,0,0,1,8.8281,13.8281Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

MoreVert.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default MoreVert;
