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
};
