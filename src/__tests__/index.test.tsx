import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { StyleSheet, Text } from 'react-native';
import { describe, expect, it } from '@jest/globals';
import { defaultTheme, KOFProvider, KOFText } from '../index';

type NumericWeightCase = [
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  fontFamily: string,
];

function render(element: React.ReactElement) {
  let renderer: TestRenderer.ReactTestRenderer | undefined;

  act(() => {
    renderer = TestRenderer.create(element);
  });

  return renderer as TestRenderer.ReactTestRenderer;
}

function getTextStyle(renderer: TestRenderer.ReactTestRenderer) {
  const text = renderer.root.findByType(Text);

  return StyleSheet.flatten(text.props.style);
}

describe('KOFText', () => {
  it('renders its children', () => {
    const renderer = render(<KOFText>Hola mundo</KOFText>);

    expect(renderer.root.findByType(Text).props.children).toBe('Hola mundo');
  });

  it('uses the default theme without a provider', () => {
    const renderer = render(
      <KOFText weight="bold" variant="title">
        Title
      </KOFText>
    );

    expect(getTextStyle(renderer)).toEqual(
      expect.objectContaining({
        color: defaultTheme.colors.text,
        fontFamily: defaultTheme.typography.fontFamily.bold,
        fontSize: 24,
        lineHeight: 28,
      })
    );
  });

  it('uses the theme provided by KOFProvider', () => {
    const customTheme = {
      ...defaultTheme,
      typography: {
        ...defaultTheme.typography,
        fontFamily: {
          ...defaultTheme.typography.fontFamily,
          bold: 'Custom-Bold',
        },
      },
      colors: {
        ...defaultTheme.colors,
        text: '#123456',
      },
    };

    const renderer = render(
      <KOFProvider theme={customTheme}>
        <KOFText weight="bold">Themed text</KOFText>
      </KOFProvider>
    );

    expect(getTextStyle(renderer)).toEqual(
      expect.objectContaining({
        color: '#123456',
        fontFamily: 'Custom-Bold',
      })
    );
  });

  const numericWeightCases: NumericWeightCase[] = [
    [100, defaultTheme.typography.fontFamily.thin],
    [200, defaultTheme.typography.fontFamily.thin],
    [300, defaultTheme.typography.fontFamily.regular],
    [400, defaultTheme.typography.fontFamily.regular],
    [500, defaultTheme.typography.fontFamily.medium],
    [600, defaultTheme.typography.fontFamily.semibold],
    [700, defaultTheme.typography.fontFamily.bold],
    [800, defaultTheme.typography.fontFamily.extrabold],
    [900, defaultTheme.typography.fontFamily.extrabold],
  ];

  it.each(numericWeightCases)(
    'maps numeric weight %s to the right font family',
    (weight, fontFamily) => {
      const renderer = render(
        <KOFText weight={weight}>Numeric weight text</KOFText>
      );

      expect(getTextStyle(renderer)).toEqual(
        expect.objectContaining({
          fontFamily,
        })
      );
    }
  );

  it('accepts literal colors outside the theme tokens', () => {
    const renderer = render(<KOFText color="#ff0000">Red text</KOFText>);

    expect(getTextStyle(renderer)).toEqual(
      expect.objectContaining({
        color: '#ff0000',
      })
    );
  });

  it('lets the style prop override base styles', () => {
    const renderer = render(
      <KOFText
        color="text"
        weight="regular"
        style={{ color: '#abcdef', fontSize: 32 }}
      >
        Override text
      </KOFText>
    );

    expect(getTextStyle(renderer)).toEqual(
      expect.objectContaining({
        color: '#abcdef',
        fontFamily: defaultTheme.typography.fontFamily.regular,
        fontSize: 32,
      })
    );
  });
});
