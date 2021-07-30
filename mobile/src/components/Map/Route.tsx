import React from "react";
import { Marker, Polyline, LatLng } from "react-native-maps";
import Icons from "../svg";
import theme from "../../config/Theme";

interface IRoute {
  routeCoords?: LatLng[];
}

const Route = (props: IRoute) => {
  const { routeCoords } = props;

  return (
    <>
      {routeCoords && (
        <>
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            zIndex={9}
            strokeColor={theme.colors.primary}
          />
          <Polyline
            coordinates={routeCoords}
            strokeWidth={7}
            strokeColor={theme.colors.secondaryDark}
          />
          <Marker coordinate={routeCoords[0]}>
            <Icons icon="Room" fill={theme.colors.secondaryDark} />
          </Marker>
          <Marker coordinate={routeCoords[routeCoords.length - 1]}>
            <Icons icon="Room" fill={theme.colors.secondaryDark} />
          </Marker>
        </>
      )}
    </>
  );
};

export default Route;
