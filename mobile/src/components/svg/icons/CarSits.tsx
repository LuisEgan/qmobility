import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarSits = (props: ISVG) => {
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
      <G id="icon-asientos" transform="translate(-2777 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2777 -383)"
          fill="none"
        />
        <G
          id="Grupo_3416"
          data-name="Grupo 3416"
          transform="translate(2781.061 -380.92)"
        >
          <Path
            id="Trazado_176"
            data-name="Trazado 176"
            d="M17.918,2c-1.5,0-3.014.092-4.509.235a6.091,6.091,0,0,0-.8,2.067,25.179,25.179,0,0,0-.423,4.274,3.029,3.029,0,0,0,2.818,3.053,45.919,45.919,0,0,0,5.824,0,3.026,3.026,0,0,0,2.818-3.053A25.348,25.348,0,0,0,23.226,4.3a6.113,6.113,0,0,0-.8-2.067C20.932,2.092,19.419,2,17.918,2Zm0,1.5c1.18,0,2.346.05,3.523.141a4.844,4.844,0,0,1,.282.939,23.431,23.431,0,0,1,.423,3.992,1.537,1.537,0,0,1-1.409,1.55,44.08,44.08,0,0,1-5.636,0,1.535,1.535,0,0,1-1.409-1.55,23.416,23.416,0,0,1,.423-3.992,4.712,4.712,0,0,1,.282-.939C15.572,3.553,16.738,3.5,17.918,3.5Z"
            transform="translate(2.23)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.3"
          />
          <Path
            id="Trazado_177"
            data-name="Trazado 177"
            d="M14.31,9A4.526,4.526,0,0,0,9.8,13.274L9,27.788a4.553,4.553,0,0,0,3.9,4.744,47.913,47.913,0,0,0,13.246,0,4.553,4.553,0,0,0,3.9-4.744l-.8-14.514A4.526,4.526,0,0,0,24.737,9Zm0,1.5H24.737a3,3,0,0,1,3.006,2.818l.8,14.561a3.009,3.009,0,0,1-2.583,3.147,46.615,46.615,0,0,1-12.87,0,3.006,3.006,0,0,1-2.583-3.147l.8-14.561A2.991,2.991,0,0,1,14.31,10.5Z"
            transform="translate(0.624 3.521)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.3"
          />
          <Path
            id="Trazado_178"
            data-name="Trazado 178"
            d="M11.129,24.938A3.018,3.018,0,0,0,8.311,26.91a8.874,8.874,0,0,0-.47,4.321,1.535,1.535,0,0,0,1.5,1.315H30.951a1.535,1.535,0,0,0,1.5-1.315,8.872,8.872,0,0,0-.47-4.321,2.992,2.992,0,0,0-3.335-1.926,48.953,48.953,0,0,1-17,0A2.8,2.8,0,0,0,11.129,24.938Zm-.282,1.5a1.7,1.7,0,0,1,.564,0,50.1,50.1,0,0,0,17.473,0,1.543,1.543,0,0,1,1.691.986,7.439,7.439,0,0,1,.376,3.617H9.344a7.421,7.421,0,0,1,.376-3.617A1.512,1.512,0,0,1,10.848,26.441Z"
            transform="translate(0 11.539)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.3"
          />
          <Path
            id="Trazado_179"
            data-name="Trazado 179"
            d="M24.142,22.719a.616.616,0,0,0-.611.611v2.536a.617.617,0,0,0,.611.611h1.033a.617.617,0,0,0,.611-.611V23.329a.617.617,0,0,0-.611-.611Zm.141.752h.752v2.255h-.752Z"
            transform="translate(7.936 10.423)"
            fill={fill}
            stroke={stroke}
            stroke-width="0.3"
          />
        </G>
      </G>
    </Svg>
  );
};

CarSits.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarSits;
