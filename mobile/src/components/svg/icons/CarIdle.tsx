import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarIdle = (props: ISVG) => {
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
      <G id="icon-idle" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
        />
        <G
          id="Grupo_3470"
          data-name="Grupo 3470"
          transform="translate(2754.046 -1358.315)"
        >
          <Path
            id="Trazado_3749"
            data-name="Trazado 3749"
            d="M44.954,983.362a1.785,1.785,0,0,0-1.785,1.785V990.5a1.785,1.785,0,0,0,3.569,0v-5.354A1.785,1.785,0,0,0,44.954,983.362ZM34.218,987.8a1.77,1.77,0,0,0-1.255.53,1.8,1.8,0,0,0,0,2.537l3.792,3.764a1.775,1.775,0,0,0,2.51-2.51L35.5,988.325A1.834,1.834,0,0,0,34.218,987.8Zm21.471,0a1.834,1.834,0,0,0-1.283.53l-3.764,3.792a1.775,1.775,0,1,0,2.51,2.51l3.792-3.764a1.8,1.8,0,0,0,0-2.537A1.77,1.77,0,0,0,55.689,987.8Zm-25.9,10.736a1.785,1.785,0,1,0,0,3.569h5.354a1.785,1.785,0,1,0,0-3.569Zm24.985,0a1.785,1.785,0,1,0,0,3.569h5.354a1.785,1.785,0,1,0,0-3.569Zm-16.759,6.943a1.77,1.77,0,0,0-1.255.53l-3.792,3.764a1.794,1.794,0,0,0,2.537,2.537l3.764-3.792a1.785,1.785,0,0,0-1.255-3.039Zm13.886,0a1.785,1.785,0,0,0-1.255,3.039l3.764,3.792a1.794,1.794,0,1,0,2.537-2.537L53.152,1006A1.77,1.77,0,0,0,51.9,1005.474Zm-6.943,2.872a1.785,1.785,0,0,0-1.785,1.785v5.354a1.785,1.785,0,0,0,3.569,0v-5.354A1.785,1.785,0,0,0,44.954,1008.346Z"
            fill={fill}
            stroke={stroke}
          />
        </G>
      </G>
    </Svg>
  );
};

CarIdle.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarIdle;
