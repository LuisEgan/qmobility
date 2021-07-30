import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Delete = (props: ISVG) => {
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
        d="M15.82,3.32V5H4.18V3.32H7.07L7.93,2.5H12.07l.8594.82ZM5,15.82v-10H15v10a1.7368,1.7368,0,0,1-1.68,1.68H6.68a1.6062,1.6062,0,0,1-1.1719-.5078A1.6062,1.6062,0,0,1,5,15.82Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Delete.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Delete;
