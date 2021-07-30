import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const ExitApp = (props: ISVG) => {
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
        d="M15.82,2.5a1.5917,1.5917,0,0,1,1.1914.5078A1.6394,1.6394,0,0,1,17.5,4.18V7.5H15.82V4.18H4.18V15.82H15.82V12.5H17.5v3.32a1.6361,1.6361,0,0,1-.4883,1.1719A1.588,1.588,0,0,1,15.82,17.5H4.18a1.61,1.61,0,0,1-1.1719-.5078A1.61,1.61,0,0,1,2.5,15.82V4.18a1.6133,1.6133,0,0,1,.5078-1.1719A1.6133,1.6133,0,0,1,4.18,2.5ZM10.43,14.18,6.25,10l4.18-4.18,1.1719,1.1719L9.4531,9.18H17.5V10.82H9.4531l2.1485,2.1875Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

ExitApp.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default ExitApp;
