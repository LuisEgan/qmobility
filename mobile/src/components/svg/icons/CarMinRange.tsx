import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarMinRange = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 50 50"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <G id="icon-min-range" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
        />
        <G
          id="Grupo_3468"
          data-name="Grupo 3468"
          transform="translate(2776.836 -370.059)"
        >
          <Path
            id="Trazado_3743"
            data-name="Trazado 3743"
            d="M10.559,20.117a7.559,7.559,0,1,1,7.559-7.559A7.567,7.567,0,0,1,10.559,20.117Zm0-12.094a4.535,4.535,0,1,0,4.535,4.535A4.541,4.541,0,0,0,10.559,8.023Z"
            transform="translate(4.047)"
            fill={fill}
            stroke={stroke}
          />
          <Path
            id="Trazado_3744"
            data-name="Trazado 3744"
            d="M8.559,10.023H2.512A1.512,1.512,0,0,1,2.512,7H8.559a1.512,1.512,0,0,1,0,3.023Z"
            transform="translate(0 4.047)"
            fill={fill}
            stroke={stroke}
          />
          <Path
            id="Trazado_3745"
            data-name="Trazado 3745"
            d="M29.676,10.023H8.512A1.512,1.512,0,0,1,8.512,7H29.676a1.512,1.512,0,0,1,0,3.023Z"
            transform="translate(12.141 4.047)"
            fill={fill}
            stroke={stroke}
          />
        </G>
      </G>
    </Svg>
  );
};

CarMinRange.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarMinRange;
