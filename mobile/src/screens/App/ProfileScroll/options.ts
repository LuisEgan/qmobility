import { questionsMultiplliers } from "./slides";

export enum ECategory {
  Family = "FAMILY",
  Luxury = "LUXURY",
  Sporty = "SPORTY",
  Urban = "URBAN",
}

export interface IOption {
  answer: string;
  category: ECategory;
}

export type ICardOptions = Array<IOption>;

export interface IAnswers {
  // * question: category
  [question: string]: ECategory;
}

export interface IOptionsSet {
  question: string;
  options: ICardOptions;
  answers: IAnswers;
  setAnswers: (answers: IAnswers) => void;
}

export const allCardOptions: ICardOptions[] = [
  // * clothing
  [
    { answer: "Something that doesn’t stain", category: ECategory.Family },
    { answer: "Designer stuff please", category: ECategory.Luxury },
    { answer: "Comfy and sporty", category: ECategory.Sporty },
    { answer: "I’m a City Gal/Pal", category: ECategory.Urban },
  ],

  // * weekend
  [
    { answer: "Going to a Gig", category: ECategory.Urban },
    { answer: "Hitting the Hiking Trails", category: ECategory.Sporty },
    { answer: "Fancy Spa Weekend Away", category: ECategory.Luxury },
    { answer: "Adventures With Kids", category: ECategory.Family },
  ],

  // * hobby
  [
    { answer: "Sipping Grand Crus", category: ECategory.Luxury },
    { answer: "Hitting the gym", category: ECategory.Sporty },
    { answer: "Meeting Up with Friends", category: ECategory.Urban },
    { answer: "Always something to do at home", category: ECategory.Family },
  ],

  // * restaurant
  [
    { answer: "Anywhere with great cocktails", category: ECategory.Urban },
    { answer: "With a Decent Kid Menu", category: ECategory.Family },
    {
      answer: "Best ribeye & wine in town with a view",
      category: ECategory.Luxury,
    },
    { answer: "BBQ on a beach", category: ECategory.Sporty },
  ],
];

export const getRecommendedCategory = (answers: IAnswers): string => {
  // * Get all categories points by their questions answers
  const pointsByCategory = {
    [`${ECategory.Family}`]: 0,
    [`${ECategory.Luxury}`]: 0,
    [`${ECategory.Sporty}`]: 0,
    [`${ECategory.Urban}`]: 0,
  };

  Object.keys(answers).forEach((question) => {
    const category = answers[question];
    pointsByCategory[category] += 1 * questionsMultiplliers[question];
  });

  // * Get the category with most points
  let winner = "";
  let previousWinnerPoints = 0;
  let previousWinnerCategory = "";

  Object.keys(pointsByCategory).forEach((category) => {
    if (pointsByCategory[category] > previousWinnerPoints) {
      winner = category;
      previousWinnerPoints = pointsByCategory[category];
      previousWinnerCategory = category;
    } else if (pointsByCategory[category] === previousWinnerPoints) {
      const random = Math.random() >= 0.5;

      winner = random ? category : previousWinnerCategory;

      previousWinnerPoints = random
        ? previousWinnerPoints
        : pointsByCategory[category];

      previousWinnerCategory = random ? previousWinnerCategory : category;
    }
  });

  return winner;
};
