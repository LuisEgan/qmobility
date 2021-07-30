import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarDoors = (props: ISVG) => {
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
      <G id="icon-puerta" transform="translate(-2777 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2777 -383)"
          fill="none"
        />
        <G
          id="Grupo_3417"
          data-name="Grupo 3417"
          transform="translate(2764 -393.706)"
        >
          <Path
            id="Trazado_180"
            data-name="Trazado 180"
            d="M53.46,16.46H33.748a.571.571,0,0,0-.469.246L21.853,32.989a.571.571,0,0,0-.1.326v20.9a.571.571,0,0,0,.571.571H53.46a.571.571,0,0,0,.571-.571V17.031A.571.571,0,0,0,53.46,16.46Zm-.571,37.184h-30V33.492L34.046,17.6H52.9Z"
            fill={fill}
            stroke={stroke}
            stroke-width="0.5"
          />
          <Path
            id="Trazado_181"
            data-name="Trazado 181"
            d="M26.816,36.624a.571.571,0,0,0,.509.309H52.75a.571.571,0,0,0,.571-.571V22.031a.571.571,0,0,0-.571-.571H37.381a.571.571,0,0,0-.469.246L26.856,36.052A.571.571,0,0,0,26.816,36.624ZM37.672,22.6H52.179V35.79H28.422Z"
            transform="translate(-2.147 -2.143)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.5"
          />
          <Path
            id="Trazado_182"
            data-name="Trazado 182"
            d="M66.307,54.21H64.25a2.16,2.16,0,0,0,0,4.319h2.057a2.16,2.16,0,0,0,0-4.319Zm0,3.177H64.25a1.017,1.017,0,0,1,0-2.034h2.057a1.017,1.017,0,1,1,0,2.034Z"
            transform="translate(-17.292 -16.181)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.5"
          />
        </G>
      </G>
    </Svg>
  );
};

CarDoors.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarDoors;
