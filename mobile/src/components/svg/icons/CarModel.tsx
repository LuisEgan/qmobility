import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarModel = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 50 50"
      fill={fill}
      stroke={stroke}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <G id="icon-marca" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
        />
        <G
          id="_80-hexagon"
          data-name="80-hexagon"
          transform="translate(2781.807 -375.487)"
        >
          <Path
            id="Trazado_3724"
            data-name="Trazado 3724"
            d="M17.187,33.608a1.1,1.1,0,0,1-.547-.146l-13.1-7.57A1.1,1.1,0,0,1,3,24.946L3.005,9.794a1.091,1.091,0,0,1,.545-.945l13.1-7.58a1.1,1.1,0,0,1,1.094,0l13.1,7.571a1.1,1.1,0,0,1,.545.946L31.38,24.936a1.091,1.091,0,0,1-.545.945l-13.1,7.58a1.092,1.092,0,0,1-.547.147Zm-12-9.293,12,6.94L29.2,24.306,29.2,10.415l-12-6.94L5.189,10.424Z"
            transform="translate(0 0)"
            fill={fill}
          />
        </G>
      </G>
    </Svg>
  );
};

CarModel.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarModel;
