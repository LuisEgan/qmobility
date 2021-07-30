import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Spa = (props: ISVG) => {
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
        d="M1.68,8.32A9.3657,9.3657,0,0,1,6.5234,9.6094,10.2714,10.2714,0,0,1,10,12.8906a10.2623,10.2623,0,0,1,3.4766-3.2812A9.3608,9.3608,0,0,1,18.32,8.32a9.9567,9.9567,0,0,1-1.8555,5.8985,9.8255,9.8255,0,0,1-4.8242,3.6718A12.2144,12.2144,0,0,1,10,18.32a7.5919,7.5919,0,0,1-1.6406-.43,9.8167,9.8167,0,0,1-4.8242-3.6718A9.95,9.95,0,0,1,1.68,8.32Zm11.2109-.3125A11.5975,11.5975,0,0,0,10,10.2344,11.6157,11.6157,0,0,0,7.1094,8.0078a9.8481,9.8481,0,0,1,2.93-6.3281A9.52,9.52,0,0,1,12.8906,8.0078Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Spa.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Spa;
