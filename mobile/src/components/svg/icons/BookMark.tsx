import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const BookMark = (props: ISVG) => {
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
        d="M14.18,2.5a1.5506,1.5506,0,0,1,1.1523.5078A1.6435,1.6435,0,0,1,15.82,4.18V17.5L10,15,4.18,17.5V4.18A1.6394,1.6394,0,0,1,4.668,3.0078,1.5478,1.5478,0,0,1,5.82,2.5Z"
      />
    </Svg>
  );
};

BookMark.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default BookMark;
