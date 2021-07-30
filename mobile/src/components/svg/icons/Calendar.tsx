import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Calendar = (props: ISVG) => {
  const { stroke, fill } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
    >
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        stroke={stroke || "black"}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </Svg>
  );
};

Calendar.defaultProps = {
  stroke: "white",
  fill: "black",
};

export default Calendar;
