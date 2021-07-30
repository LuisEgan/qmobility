import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Search = (props: ISVG) => {
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
        d="M12.93,11.68,17.07,15.82l-1.25,1.25L11.68,12.93v-.6641l-.2344-.2344A5.1894,5.1894,0,0,1,7.93,13.32,5.2689,5.2689,0,0,1,4.082,11.7578,5.1715,5.1715,0,0,1,2.5,7.93,5.2384,5.2384,0,0,1,4.082,4.082,5.2368,5.2368,0,0,1,7.93,2.5a5.1745,5.1745,0,0,1,3.8281,1.582A5.2745,5.2745,0,0,1,13.32,7.93a5.1858,5.1858,0,0,1-1.2891,3.5156l.2344.2344ZM5.2734,10.5859A3.6138,3.6138,0,0,0,7.93,11.68a3.7346,3.7346,0,0,0,3.75-3.75A3.7344,3.7344,0,0,0,7.93,4.18,3.7342,3.7342,0,0,0,4.18,7.93,3.6133,3.6133,0,0,0,5.2734,10.5859Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Search.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Search;
