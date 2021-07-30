import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Nature = (props: ISVG) => {
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
        d="M10.82,13.4375V16.68h5V18.32H4.18V16.68h5V13.3984a5.6944,5.6944,0,0,1-3.4961-1.9726,5.6193,5.6193,0,0,1-1.3867-3.77A5.6428,5.6428,0,0,1,6.0156,3.5156a5.6435,5.6435,0,0,1,4.1406-1.7187,5.5814,5.5814,0,0,1,4.1211,1.7187,5.6779,5.6779,0,0,1,1.6993,4.1406,5.5774,5.5774,0,0,1-1.4844,3.8672A5.7676,5.7676,0,0,1,10.82,13.4375Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Nature.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Nature;
