import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const DirectionsCar = (props: ISVG) => {
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
        d="M15.7812,5,17.5,10v6.68a.8011.8011,0,0,1-.82.82H15.82a.8011.8011,0,0,1-.82-.82V15.82H5V16.68a.8011.8011,0,0,1-.82.82H3.32a.8011.8011,0,0,1-.82-.82V10L4.2188,5A1.111,1.111,0,0,1,5.43,4.18H14.57A1.1117,1.1117,0,0,1,15.7812,5ZM4.18,9.18H15.82L14.57,5.43H5.43Zm.3711,3.7695a1.2263,1.2263,0,0,0,1.7578,0A1.25,1.25,0,0,0,5.43,10.82a1.243,1.243,0,0,0-.8789,2.1289Zm9.1406,0A1.2263,1.2263,0,1,0,13.32,12.07,1.1975,1.1975,0,0,0,13.6914,12.9492Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

DirectionsCar.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default DirectionsCar;
