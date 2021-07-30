import React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarColor = (props: ISVG) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      fill={fill}
      stroke={stroke}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 50 50"
    >
      <G id="icon-color" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
          stroke={stroke}
        />
        <G
          id="Grupo_3421"
          data-name="Grupo 3421"
          transform="translate(2766.784 -391.386)"
        >
          <Path
            id="Trazado_3663"
            data-name="Trazado 3663"
            d="M11.8,33.554a5.862,5.862,0,0,0,1.71,4.169l9.62,9.62a5.772,5.772,0,0,0,4.169,1.71,5.862,5.862,0,0,0,4.169-1.71L46.592,32.217a.517.517,0,0,0,0-.748L29.383,14.26a.517.517,0,0,0-.748,0l-8.177,8.23a.408.408,0,0,0-.267-.107H14.365a2.74,2.74,0,0,0,0,5.451h.695l-1.55,1.55A6.1,6.1,0,0,0,11.8,33.554Zm20.309-5.718A1.826,1.826,0,0,0,33.765,28.9a1.871,1.871,0,1,0,0-3.741,1.843,1.843,0,0,0-1.817,1.6H17.679l11.33-11.384L45.416,31.79,30.719,46.54a4.806,4.806,0,0,1-6.787,0l-9.62-9.62a4.806,4.806,0,0,1,0-6.787l2.3-2.3h15.5ZM14.365,26.766a1.682,1.682,0,0,1,0-3.314h5.077l-3.314,3.314Z"
            transform="translate(0 0)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.5"
          />
          <Path
            id="Trazado_3664"
            data-name="Trazado 3664"
            d="M70.919,54.125c-.214.321-5.718,7.482-5.718,10.742a6.146,6.146,0,1,0,12.292,0c0-3.26-5.5-10.422-5.718-10.742A.556.556,0,0,0,70.919,54.125Zm5.5,10.742a5.077,5.077,0,0,1-10.154,0c0-2.191,3.367-7.161,5.077-9.513C73.056,57.653,76.423,62.676,76.423,64.868Z"
            transform="translate(-24.861 -18.541)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.5"
          />
        </G>
      </G>
    </Svg>
  );
};

CarColor.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarColor;
