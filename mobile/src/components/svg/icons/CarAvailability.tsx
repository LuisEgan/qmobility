import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const CarAvailability = (props: ISVG) => {
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
      <G id="icon-fecha-disponible" transform="translate(-2774 383)">
        <Rect
          id="Rectángulo_1975"
          data-name="Rectángulo 1975"
          width="50"
          height="50"
          transform="translate(2774 -383)"
          stroke={stroke}
          fill="none"
        />
        <G
          id="Outline_Icon"
          data-name="Outline Icon"
          transform="translate(2778.347 -378.698)"
        >
          <Path
            id="Trazado_3665"
            data-name="Trazado 3665"
            d="M32.534,31.279a1.038,1.038,0,0,0-1.422,0l-6.852,6.444-2.2-2.064a1.038,1.038,0,0,0-1.422,0l-2.327,2.189a.984.984,0,0,0,0,1.441l5.235,4.925a1.043,1.043,0,0,0,1.422,0l9.887-9.305a.984.984,0,0,0,0-1.441ZM24.259,43.2l-4.922-4.631,2.013-1.894,2.909,2.736,7.561-7.114,2.013,1.894Z"
            transform="translate(-6.188 -10.828)"
            stroke={stroke}
            fill={fill}
          />
          <Path
            id="Trazado_3666"
            data-name="Trazado 3666"
            d="M35.728,6.679H32.049V6.066a3.066,3.066,0,1,0-6.132,0v.613H14.878V6.066a3.066,3.066,0,0,0-6.132,0v.613H5.066A3.07,3.07,0,0,0,2,9.746V35.5a3.07,3.07,0,0,0,3.066,3.066H35.728A3.07,3.07,0,0,0,38.795,35.5V9.746a3.07,3.07,0,0,0-3.066-3.066Zm-8.585-.613a1.84,1.84,0,0,1,3.679,0V8.519a1.84,1.84,0,0,1-3.679,0Zm-17.171,0a1.84,1.84,0,1,1,3.679,0V8.519a1.84,1.84,0,0,1-3.679,0ZM35.728,37.342H5.066a1.84,1.84,0,0,1-1.84-1.84V15.878H29.6a.613.613,0,1,0,0-1.226H3.226V9.746a1.84,1.84,0,0,1,1.84-1.84H8.746v.613a3.066,3.066,0,0,0,6.132,0V7.906H25.917v.613a3.066,3.066,0,1,0,6.132,0V7.906h3.679a1.84,1.84,0,0,1,1.84,1.84v4.906H33.275a.613.613,0,0,0,0,1.226h4.293V35.5a1.84,1.84,0,0,1-1.84,1.84Z"
            stroke={stroke}
            fill={fill}
          />
        </G>
      </G>
    </Svg>
  );
};

CarAvailability.defaultProps = {
  fill: "black",
  stroke: "black",
};

export default CarAvailability;
