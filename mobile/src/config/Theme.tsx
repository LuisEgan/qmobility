import { createText, BaseTheme, createBox } from "@shopify/restyle";

const palette = {
  bluePrimary: "#00B0F0",
  bluePrimaryDark: "#0197CE",
  bluePrimaryLight: "#00D6FD",
  bluePrimaryLighter: "#A7F1FF",

  blueSecondary: "#3B64B7",
  blueSecondaryDark: "#002060",
  blueSecondaryLight: "#CAD4E8",
  blueSecondaryLighter: "#E9ECF4",

  gray: "#707070",
  grayDark: "#282F39",
  grayLight: "#ACACAC",
  grayLighter: "#F2F2F2",

  black: "black",
  blackTransparent: "rgba(0,0,0,0.4)",

  white: "white",

  green: "green",
  red: "red",
  redLight: "#FF8077",

  yellow: "#FFB900",

  purple: "#76ff",
};

const theme: BaseTheme = {
  colors: {
    primary: palette.bluePrimary,
    primaryDark: palette.bluePrimaryDark,
    primaryLight: palette.bluePrimaryLight,
    primaryLighter: palette.bluePrimaryLighter,

    secondary: palette.blueSecondary,
    secondaryDark: palette.blueSecondaryDark,
    secondaryLight: palette.blueSecondaryLight,
    secondaryLighter: palette.blueSecondaryLighter,

    title: palette.grayDark,
    subTitle: palette.gray,
    background: palette.grayLight,
    backgroundLighter: palette.white,

    borderColor: palette.grayLighter,
    drawerHandle: palette.gray,

    white: palette.white,
    green: palette.green,
    yellow: palette.yellow,
    purple: palette.purple,
    red: palette.red,
    redLight: palette.redLight,
    black: palette.black,
    blackTransparent: palette.blackTransparent,
    gray: palette.gray,
    grayDark: palette.grayDark,
    grayLight: palette.grayLight,
    grayLighter: palette.grayLighter,

    // * Header
    headerBackground: palette.grayLighter,

    // * Texts
    heading1: palette.grayDark,
    heading2: palette.blueSecondaryDark,
    subheadingLight: palette.gray,
    body: palette.grayDark,
    label: palette.gray,
    bodyHighlight: palette.bluePrimary,
    bodySmall: palette.grayLight,

    // * Input color
    defautlInput: palette.grayLight,

    // * Button color
    defaultButton: palette.grayLight,
    primaryButton: palette.bluePrimary,
    secondaryButton: palette.blueSecondaryDark,
    inverseButtonBackground: palette.white,

    // * Drawer Menu
    drawerBackground: palette.grayDark,

    // * Cards
    cardsBackground: palette.grayLighter,

    // * Content
    contentBackground: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    heading1: {
      fontSize: 30,
      color: "heading1",
      fontWeight: "bold",
    },
    heading2: {
      fontSize: 22,
      color: "heading2",
      fontWeight: "bold",
    },
    subheadingLight: {
      fontSize: 20,
      color: "subheadingLight",
    },
    body: {
      fontSize: 16,
      color: "body",
    },
    bodyBold: {
      fontSize: 16,
      color: "body",
      fontWeight: "bold",
    },
    label: {
      fontSize: 14,
      color: "label",
    },
    bodyHighlight: {
      fontSize: 16,
      color: "bodyHighlight",
    },
    bodyHighlightBold: {
      fontSize: 16,
      color: "bodyHighlight",
      fontWeight: "bold",
    },
    bodySmall: {
      fontSize: 12,
      color: "bodySmall",
    },
    bodySmallBold: {
      fontSize: 12,
      color: "bodySmall",
      fontWeight: "bold",
    },

    button: {
      textAlign: "center",
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
    },
    error: {
      fontSize: 14,
      color: "red",
    },
  },

  breakpoints: {},
};

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    background: palette.blueSecondaryDark,
  },
};

export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export default theme;
