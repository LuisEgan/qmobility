import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Menu = (props: ISVG) => {
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
        d="M2.5,5h15V6.68H2.5Zm0,5.82V9.18h15V10.82ZM2.5,15V13.32h15V15Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Menu.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Menu;
