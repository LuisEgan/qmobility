import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarFuel = (props: ISVG) => {
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
      <G id="icon-diesel-gasoline" transform="translate(-2777 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2777 -383)"
          fill="none"
        />
        <G
          id="Grupo_3419"
          data-name="Grupo 3419"
          transform="translate(2774 -384.384)"
        >
          <Path
            id="Trazado_184"
            data-name="Trazado 184"
            d="M27.93,9.256H16.5a5.5,5.5,0,0,0-5.5,5.5V42.838a.847.847,0,0,0,.847.847h20.74a.847.847,0,0,0,.847-.847V20.121h1.376A1.693,1.693,0,0,1,36.5,21.814V33.721a3.759,3.759,0,0,0,7.513,0V15.466a.847.847,0,0,0-.288-.635L36.9,8.85l-1.113,1.27,6.535,5.731v17.87a2.066,2.066,0,0,1-4.127,0V21.814a3.386,3.386,0,0,0-3.386-3.386H33.433v-3.67a5.5,5.5,0,0,0-5.5-5.5ZM31.74,41.987H12.693V14.759A3.809,3.809,0,0,1,16.5,10.949H27.93a3.809,3.809,0,0,1,3.809,3.809Z"
            stroke={stroke}
            fill={fill}
          />
          <Path
            id="Trazado_185"
            data-name="Trazado 185"
            d="M33.29,20.82h-10.5A1.693,1.693,0,0,0,21.1,22.513V30.69a.847.847,0,0,0,.847.847h12.19a.847.847,0,0,0,.847-.847V22.513A1.693,1.693,0,0,0,33.29,20.82Zm0,9.024h-10.5V22.513h10.5Z"
            transform="translate(-5.825 -6.904)"
            stroke={stroke}
            fill={fill}
          />
        </G>
      </G>
    </Svg>
  );
};

CarFuel.defaultProps = {
  fill: "black",
  stroke: "black",
};
export default CarFuel;
