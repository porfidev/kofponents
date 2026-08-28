import { createContext, type PropsWithChildren, useContext } from 'react';
import type { KOFTheme } from './types';
import { defaultTheme } from './defaultTheme';

const KOFThemeContext = createContext<KOFTheme>(defaultTheme);

type KOFProviderProps = PropsWithChildren<{
  theme?: Partial<KOFTheme>;
}>;

function mergeTheme(theme?: Partial<KOFTheme>): KOFTheme {
  return {
    ...defaultTheme,
    ...theme,
    typography: {
      ...defaultTheme.typography,
      ...theme?.typography,
      fontFamily: {
        ...defaultTheme.typography.fontFamily,
        ...theme?.typography?.fontFamily,
      },
      fontSize: theme?.typography?.fontSize ?? defaultTheme.typography.fontSize,
      lineHeight:
        theme?.typography?.lineHeight ?? defaultTheme.typography.lineHeight,
    },
  };
}

export function KOFProvider({ theme, children }: KOFProviderProps) {
  return (
    <KOFThemeContext.Provider value={mergeTheme(theme)}>
      {children}
    </KOFThemeContext.Provider>
  );
}

export function useKOFTheme() {
  return useContext(KOFThemeContext);
}
