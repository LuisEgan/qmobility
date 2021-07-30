import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Domain = (props: ISVG) => {
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
        d="M10,5.82h8.32V17.5H1.68V2.5H10Zm-5,0V4.18H3.32V5.82ZM5,9.18V7.5H3.32V9.18ZM5,12.5V10.82H3.32V12.5Zm0,3.32V14.18H3.32V15.82Zm3.32-10V4.18H6.68V5.82Zm0,3.3594V7.5H6.68V9.18Zm0,3.32V10.82H6.68V12.5Zm0,3.32V14.18H6.68V15.82Zm8.3594,0V7.5H10V9.18h1.68V10.82H10V12.5h1.68v1.68H10V15.82ZM15,9.18V10.82H13.32V9.18Zm0,3.32v1.68H13.32V12.5Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Domain.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Domain;
