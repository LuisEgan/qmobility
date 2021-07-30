import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const LinkedIn = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 2500 2389"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        fill="#0076B3"
        stroke={stroke}
        d="M0,277.5c0-80.4,28.2-146.8,84.5-199.1C140.8,26.1,214,0,304.1,0c88.5,0,160.1,25.7,214.8,77.2
c56.3,53.1,84.5,122.3,84.5,207.5c0,77.2-27.3,141.6-82,193.1c-56.3,53.1-130.3,79.6-222,79.6h-2.4c-88.5,0-160.1-26.5-214.8-79.6
S0,357.9,0,277.5z M31.4,2389V777h535.7v1612H31.4z M863.9,2389h535.7v-900.1c0-56.3,6.4-99.7,19.3-130.3
c22.5-54.7,56.7-101,102.6-138.8c45.8-37.8,103.4-56.7,172.5-56.7c180.2,0,270.3,121.5,270.3,364.4V2389H2500v-924.2
c0-238.1-56.3-418.7-168.9-541.7c-112.6-123.1-261.4-184.6-446.4-184.6c-207.5,0-369.2,89.3-485,267.9v4.8h-2.4l2.4-4.8V777H863.9
c3.2,51.5,4.8,211.5,4.8,480.2C868.7,1525.9,867.1,1903.2,863.9,2389z"
      />
    </Svg>
  );
};

LinkedIn.defaultProps = {
  fill: "#0076B3",
  stroke: "#0076B3",
};

export default LinkedIn;
