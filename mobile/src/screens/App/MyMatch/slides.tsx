import React from "react";
import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";
import { Icons } from "../../../components";

type ISlides = Array<ISlide>;

const slides: ISlides = [
  {
    title: "Hello, I'm eVe",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
  },
  {
    title: "Who is eVe?",
    text:
      "2If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryDark,
  },
  {
    title: "Why eVe",
    text:
      "3If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLight,
  },
  {
    title: "How to",
    text:
      "4If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLighter,
    titleColor: "primary",
    textColor: "primary",
  },
];

export default slides;
