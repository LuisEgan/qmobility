import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const EvStation = (props: ISVG) => {
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
        d="M16.4844,6.0156A2.0122,2.0122,0,0,1,17.07,7.5v7.93a2.0715,2.0715,0,0,1-3.5351,1.4648A1.9918,1.9918,0,0,1,12.93,15.43V11.25H11.68V17.5H3.32V4.18a1.61,1.61,0,0,1,.5078-1.1719A1.61,1.61,0,0,1,5,2.5h5a1.6133,1.6133,0,0,1,1.1719.5078A1.6133,1.6133,0,0,1,11.68,4.18V10h.82a1.7368,1.7368,0,0,1,1.68,1.68v3.75a.82.82,0,1,0,1.6406,0V9.4141A2.0807,2.0807,0,0,1,12.93,7.5a1.9614,1.9614,0,0,1,1.3281-1.9531L12.5,3.7891l.8984-.8594ZM6.68,15,10,9.18H8.32V5L5,11.25H6.68Zm7.7344-6.9141A.8495.8495,0,1,0,14.18,7.5.7946.7946,0,0,0,14.4141,8.0859Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

EvStation.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default EvStation;
