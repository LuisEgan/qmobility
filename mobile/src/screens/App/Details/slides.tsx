import { ISlide } from "../../../components/Slider/Slide";

type ISlides = Array<ISlide>;

const slides = (images: string[]): ISlides => {
  const firstSlides: ISlides = [];

  images.some((imgUri, index) => {
    if (index >= 5) return true;

    const slice: ISlide = { imgUri };
    firstSlides.push(slice);
    return false;
  });

  return firstSlides;
};
export default slides;
