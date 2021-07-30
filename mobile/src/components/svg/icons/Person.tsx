import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Person = (props: ISVG) => {
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
        d="M5.6055,12.5977A11.7828,11.7828,0,0,1,10,11.68a11.7828,11.7828,0,0,1,4.3945.918Q16.68,13.5162,16.68,15v1.68H3.32V15Q3.32,13.5161,5.6055,12.5977Zm6.7383-3.5743a3.3008,3.3008,0,0,1-4.6876,0A3.1932,3.1932,0,0,1,6.68,6.68a3.2608,3.2608,0,0,1,.9765-2.3633,3.2555,3.2555,0,0,1,4.6876,0A3.2648,3.2648,0,0,1,13.32,6.68,3.1971,3.1971,0,0,1,12.3438,9.0234Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Person.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Person;
