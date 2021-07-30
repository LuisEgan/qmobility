import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "../icons/TypeIcons";

const ArrowBack = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 21 20"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        fill={fill}
        stroke={stroke}
        d="M9.18,3.32H10.82V13.4766l4.6875-4.6485L16.68,10,10,16.68,3.32,10,4.4922,8.8281,9.18,13.4766Z"
      />
    </Svg>
  );
};

ArrowBack.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default ArrowBack;
