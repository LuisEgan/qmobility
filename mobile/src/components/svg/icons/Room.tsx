import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Setting = (props: ISVG) => {
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
        d="M5.8789,3.3789A5.6108,5.6108,0,0,1,10,1.68a5.6122,5.6122,0,0,1,4.1211,1.6992A5.6122,5.6122,0,0,1,15.82,7.5a7.8127,7.8127,0,0,1-.6055,2.7734,17.165,17.165,0,0,1-1.4648,2.93q-.86,1.3682-1.6992,2.5586-.8409,1.1923-1.4258,1.8945L10,18.32q-.2343-.2724-.625-.7226-.391-.4484-1.4062-1.7969a29.9019,29.9019,0,0,1-1.7774-2.6172,18.8835,18.8835,0,0,1-1.3867-2.8711A7.893,7.893,0,0,1,4.18,7.5,5.6122,5.6122,0,0,1,5.8789,3.3789ZM8.5352,8.9648a2.0745,2.0745,0,0,0,2.93,0,2.0745,2.0745,0,0,0,0-2.93,2.0745,2.0745,0,0,0-2.93,0,2.0745,2.0745,0,0,0,0,2.93Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Setting.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Setting;
