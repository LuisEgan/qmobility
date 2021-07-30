import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Email = (props: ISVG) => {
  const { fill } = props;

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
        fill={fill}
        d="M16.68,3.32a1.5506,1.5506,0,0,1,1.1523.5078A1.6435,1.6435,0,0,1,18.32,5V15a1.64,1.64,0,0,1-.4883,1.1719A1.5473,1.5473,0,0,1,16.68,16.68H3.32a1.5445,1.5445,0,0,1-1.1523-.5078A1.6361,1.6361,0,0,1,1.68,15V5A1.6394,1.6394,0,0,1,2.168,3.8281,1.5478,1.5478,0,0,1,3.32,3.32ZM10,9.18,16.68,5H3.32ZM16.68,15V6.68L10,10.82,3.32,6.68V15Z"
      />
    </Svg>
  );
};

Email.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Email;
