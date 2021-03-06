import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const History = (props: ISVG) => {
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
        d="M5.5273,4.6875A7.2516,7.2516,0,0,1,10.82,2.5a7.2546,7.2546,0,0,1,5.293,2.1875A7.2045,7.2045,0,0,1,18.32,10a7.2014,7.2014,0,0,1-2.207,5.3125A7.2507,7.2507,0,0,1,10.82,17.5a7.1835,7.1835,0,0,1-5.2734-2.1875l1.1719-1.2109A5.5954,5.5954,0,0,0,10.82,15.82a5.6779,5.6779,0,0,0,4.1406-1.6992A5.58,5.58,0,0,0,16.68,10a5.5815,5.5815,0,0,0-1.7188-4.1211A5.6779,5.6779,0,0,0,10.82,4.18,5.6108,5.6108,0,0,0,6.6992,5.8789,5.6122,5.6122,0,0,0,5,10H7.5L4.1406,13.3594l-.0781-.1172L.82,10h2.5A7.2011,7.2011,0,0,1,5.5273,4.6875ZM10,6.68h1.25v3.5156l2.93,1.7578-.625,1.0157L10,10.82Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

History.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default History;
