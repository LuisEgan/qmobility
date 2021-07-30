import React from "react";
import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";
import { Icons } from "../../../components";

type ISlides = Array<ISlide>;

const slides: ISlides = [
  {
    title: "Hello, this is Eve",
    text: "Electric cars are coming. Eve is the smarter way to drive electric.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
  },
  {
    title: "What is Eve?",
    text:
      "Eve is a variety of services to make electric car use simple. Car selection, charging, route planning. Everything.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryDark,
  },
  {
    title: "Why Eve?",
    text:
      "Eve will sort everything out. From advice on suitable cars, to the best possible car packages. Try us!",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLight,
  },
  {
    title: "What's next?",
    text:
      "Investigate your usual driving routes and see what car suits your needs. Then get in touch with us on eve.one",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLighter,
    titleColor: "primary",
    textColor: "primary",
  },
];

export default slides;
