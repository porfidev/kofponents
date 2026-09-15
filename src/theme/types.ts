export type KOFFontFamily = {
  thin: string;
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
};

export type KOFTypography = {
  fontFamily: KOFFontFamily;
  fontSize: number;
  lineHeight: number;
};

type KOFButtonColors = {
  bgColor: string;
  textColor: string;
  borderColor?: string;
};

type KOFButtonPalette = {
  default: KOFButtonColors;
  hover: KOFButtonColors;
  pressed: KOFButtonColors;
  disabled: KOFButtonColors;
};

export type KOFTheme = {
  typography: KOFTypography;
  colors: {
    text: string;
    background: string;
  };
  labels: {
    bgSurfaceWarning: string;
    bgSurfaceError: string;
    textError: string;
    textWarning: string;
  };
  buttons: {
    primary: KOFButtonPalette;
    secondary: KOFButtonPalette;
  };
};
