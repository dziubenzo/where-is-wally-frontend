import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

type ThemeProps = {
  children: ReactNode;
};

const darkTheme = {
  colours: {
    background: '#0C0C0C',
    primary: '#F2613F',
    primaryIcon:
      'invert(44%) sepia(56%) saturate(1939%) hue-rotate(338deg) brightness(102%) contrast(90%)',
    secondary: '#9B3922',
    secondaryIcon:
      'invert(23%) sepia(38%) saturate(2756%) hue-rotate(345deg) brightness(99%) contrast(88%)',
    tertiary: '#481E14',
    tertiaryIcon:
      'invert(12%) sepia(65%) saturate(903%) hue-rotate(331deg) brightness(95%) contrast(95%)',
  },
  fontSizes: {
    small: '0.8rem',
    standard: '1rem',
    medium: '1.2rem',
    large: '1.5rem',
    extraLarge: '2rem',
  },
  mobile: '768px',
};

export default function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
