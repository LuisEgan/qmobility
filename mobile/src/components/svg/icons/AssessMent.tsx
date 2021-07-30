import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const AssessMent = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 20 21"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        fill={fill}
        stroke={stroke}
        d="M15.82,2.5a1.6133,1.6133,0,0,1,1.1719.5078A1.6133,1.6133,0,0,1,17.5,4.18V15.82a1.7368,1.7368,0,0,1-1.68,1.68H4.18a1.6062,1.6062,0,0,1-1.1719-.5078A1.6062,1.6062,0,0,1,2.5,15.82V4.18a1.61,1.61,0,0,1,.5078-1.1719A1.61,1.61,0,0,1,4.18,2.5ZM7.5,14.18V8.32H5.82V14.18Zm3.32,0V5.82H9.18V14.18Zm3.3594,0V10.82H12.5V14.18Z"
      />
    </Svg>
  );
};

AssessMent.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default AssessMent;
