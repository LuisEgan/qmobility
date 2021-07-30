import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Home = (props: ISVG) => {
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
        d="M8.32,16.68H4.18V10H1.68L10,2.5,18.32,10h-2.5v6.68H11.68v-5H8.32Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Home.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Home;
