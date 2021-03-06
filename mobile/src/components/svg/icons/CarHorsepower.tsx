import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarHorsepower = (props: ISVG) => {
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
      <G id="icon-fuerza-motor" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          fill="none"
        />
        <G
          id="Grupo_3420"
          data-name="Grupo 3420"
          transform="translate(2780.441 -376.086)"
        >
          <G
            id="Grupo_2629"
            data-name="Grupo 2629"
            transform="translate(-5.441 -8.914)"
          >
            <Path
              id="Trazado_188"
              data-name="Trazado 188"
              d="M39.475,15h-.16a9.31,9.31,0,0,0-2.781.425l-24.9,7.782A13.667,13.667,0,0,0,2,36.309a3.678,3.678,0,0,0,3.674,3.674H33.913a8.777,8.777,0,0,0,6.25-2.589,8.891,8.891,0,0,0,2.086-3.307l3.307-9.372a9.253,9.253,0,0,0,.532-3.1A6.621,6.621,0,0,0,39.475,15Zm4.7,9.224L40.865,33.6a7.432,7.432,0,0,1-1.74,2.758,7.319,7.319,0,0,1-5.211,2.159H5.674a2.2,2.2,0,0,1-2.2-2.2,12.205,12.205,0,0,1,8.6-11.7l24.905-7.782a7.854,7.854,0,0,1,2.338-.357h.16a5.15,5.15,0,0,1,5.144,5.144,7.813,7.813,0,0,1-.447,2.611Z"
              transform="translate(0 0)"
              fill={fill}
              stroke={stroke}
            />
            <Path
              id="Trazado_189"
              data-name="Trazado 189"
              d="M17.878,29a5.878,5.878,0,1,0,5.878,5.878A5.878,5.878,0,0,0,17.878,29Zm0,10.287a4.409,4.409,0,1,1,4.409-4.409A4.409,4.409,0,0,1,17.878,39.287Z"
              transform="translate(-2.652 -3.713)"
              fill={fill}
              stroke={stroke}
            />
            <Path
              id="Trazado_190"
              data-name="Trazado 190"
              d="M18.939,33a2.939,2.939,0,1,0,2.939,2.939A2.939,2.939,0,0,0,18.939,33Zm0,4.409a1.47,1.47,0,1,1,1.47-1.47A1.47,1.47,0,0,1,18.939,37.409Z"
              transform="translate(-3.713 -4.774)"
              fill={fill}
              stroke={stroke}
            />
            <Path
              id="Trazado_191"
              data-name="Trazado 191"
              d="M38.083,23a8.083,8.083,0,1,0,8.083,8.083A8.083,8.083,0,0,0,38.083,23Zm0,14.7A6.613,6.613,0,1,1,44.7,31.083,6.613,6.613,0,0,1,38.083,37.7Z"
              transform="translate(-7.426 -2.122)"
              fill={fill}
              stroke={stroke}
            />
            <Path
              id="Trazado_192"
              data-name="Trazado 192"
              d="M39.409,28a4.409,4.409,0,1,0,4.409,4.409A4.409,4.409,0,0,0,39.409,28Zm0,7.348a2.939,2.939,0,1,1,2.939-2.939A2.939,2.939,0,0,1,39.409,35.348Z"
              transform="translate(-8.751 -3.448)"
              fill={fill}
              stroke={stroke}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

CarHorsepower.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarHorsepower;
