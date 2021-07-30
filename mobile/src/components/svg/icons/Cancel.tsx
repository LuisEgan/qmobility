import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Cancel = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 20 21"
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3.709,3.709A7.2112,7.2112,0,0,1,9,1.5117,7.212,7.212,0,0,1,14.291,3.709,7.212,7.212,0,0,1,16.4883,9a7.212,7.212,0,0,1-2.1973,5.291A7.212,7.212,0,0,1,9,16.4883,7.2112,7.2112,0,0,1,3.709,14.291,7.212,7.212,0,0,1,1.5117,9,7.212,7.212,0,0,1,3.709,3.709Zm9.0527,7.998L10.0547,9l2.707-2.707L11.707,5.2383,9,7.9453,6.293,5.2383,5.2383,6.293,7.9453,9l-2.707,2.707L6.293,12.7617,9,10.0547l2.707,2.707Z" />
    </Svg>
  );
};

Cancel.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default Cancel;
