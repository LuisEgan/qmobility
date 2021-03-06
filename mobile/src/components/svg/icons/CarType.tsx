import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarType = (props: ISVG) => {
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
      <G id="icon-car-convertible" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
        />
        <G
          id="Grupo_3441"
          data-name="Grupo 3441"
          transform="translate(2775 -366)"
        >
          <G
            id="Grupo_3441-2"
            data-name="Grupo 3441"
            transform="translate(-783 -115)"
          >
            <Path
              id="Trazado_3691"
              data-name="Trazado 3691"
              d="M801,129h12a1,1,0,0,0,0-2H801a1,1,0,0,0,0,2Zm-15.135-10h.423l3.53-1.569.083-.036a1,1,0,0,1,1.149-.331,5.085,5.085,0,0,1,.8-.064h2.124a1,1,0,0,1,.748,1.663,9.989,9.989,0,0,0,1.884.313l-.554-1.66a1,1,0,1,1,1.9-.632l.772,2.316h7.892l-.562-1.684a1,1,0,1,1,1.9-.632l.772,2.316H815.7l-3.252-2.168a1,1,0,0,1,1.11-1.664l5.828,3.885,8.527,1.551a2.928,2.928,0,0,1,.412.105,3,3,0,0,1,1.9,3.795l-.814,2.445A3,3,0,0,1,826.558,129H826a1,1,0,0,1,0-2h.558a1,1,0,0,0,.949-.684l.772-2.316H826.7a1,1,0,0,1-.7-1.712L818.91,121H797.294a12,12,0,0,1-5.366-1.267l-1.1-.552c-.065.023-.129.049-.193.078L786.712,121h-.829l-.125,1h1.167a1,1,0,0,1,0,2H785.7a.964.964,0,0,1-.187-.018l-.237,1.894a1,1,0,0,0,.869,1.116,1.017,1.017,0,0,0,.124.008H788a1,1,0,0,1,0,2h-1.734a3.1,3.1,0,0,1-.373-.023,3,3,0,0,1-2.6-3.349l.609-4.876c.006-.042.012-.084.02-.125A1,1,0,0,1,784.7,119ZM819.5,132a4.5,4.5,0,1,1,4.5-4.5A4.5,4.5,0,0,1,819.5,132Zm0-2a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,819.5,130Zm-25,2a4.5,4.5,0,1,1,4.5-4.5A4.5,4.5,0,0,1,794.5,132Zm0-2a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,794.5,130Z"
              fill={fill}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

CarType.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarType;
