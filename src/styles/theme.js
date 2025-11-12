import { createTheme } from "@mui/material/styles";

// Спільні змінні
const breakpoints = {
  values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
};

// Розширена система шрифтів
const typography = {
  fontFamily: `"Manrope", "Roboto", "Arial", sans-serif`,
  fontSize: 14,
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fonts: {
    primary: "Manrope",
    secondary: "Roboto",
  },
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: "Manrope",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.3,
    fontFamily: "Manrope",
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily: "Manrope",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: "Manrope",
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: "Manrope",
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: "Manrope",
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: "Manrope",
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
    fontFamily: "Manrope",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: "Manrope",
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.57,
    fontFamily: "Manrope",
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.57,
    fontFamily: "Manrope",
    textTransform: "none",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    fontFamily: "Manrope",
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 600,
    lineHeight: 1.66,
    fontFamily: "Manrope",
    textTransform: "uppercase",
  },
};

// Загальні стилі компонентів
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: "8px 16px",
        boxShadow: "none",
        fontWeight: 600,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        borderRadius: 12,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 600,
      },
    },
  },
};

// Загальні налаштування теми
const commonTheme = {
  breakpoints,
  typography,
  shape: { borderRadius: 8 },
  components,
};

// Палітра кольорів для світлої теми smartBook
const lightPalette = {
  mode: "light",
  primary: {
    light: "#5B8AF2",
    main: "#3A6FEA",
    dark: "#2756C5",
    contrastText: "#fff",
  },
  secondary: {
    light: "#70C2D1",
    main: "#42B0C5",
    dark: "#2A8A9C",
    contrastText: "#fff",
  },
  error: {
    light: "#EF6F6F",
    main: "#E64A4A",
    dark: "#C02828",
    contrastText: "#fff",
  },
  warning: {
    light: "#FFC978",
    main: "#FFA831",
    dark: "#DF8700",
    contrastText: "#fff",
  },
  info: {
    light: "#5DADEB",
    main: "#2996E5",
    dark: "#1A73BF",
    contrastText: "#fff",
  },
  success: {
    light: "#58CC8C",
    main: "#30B66D",
    dark: "#1E8F53",
    contrastText: "#fff",
  },
  grey: {
    50: "#FAFBFC",
    100: "#F2F4F7",
    200: "#E5E9EF",
    300: "#D2D9E1",
    400: "#B7C0CC",
    500: "#98A2B3",
    600: "#667085",
    700: "#4D5871",
    800: "#2E3A59",
    900: "#1A2035",
  },
  background: {
    default: "#F9FAFB",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1A2035",
    secondary: "#4D5871",
    disabled: "rgba(26, 32, 53, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.1)",
  action: {
    active: "rgba(58, 111, 234, 0.7)",
    hover: "rgba(58, 111, 234, 0.05)",
    selected: "rgba(58, 111, 234, 0.12)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
};

// Палітра кольорів для темної теми smartBook
const darkPalette = {
  mode: "dark",
  primary: {
    light: "#7CA2FF",
    main: "#5989FF", // Яскравіший синій для темної теми
    dark: "#3B63CC",
    contrastText: "#fff",
  },
  secondary: {
    light: "#88D6E5",
    main: "#4DBFD3", // Яскравіший блакитний для темної теми
    dark: "#309BAE",
    contrastText: "#fff",
  },
  error: {
    light: "#FF8080",
    main: "#FF5252",
    dark: "#E53935",
    contrastText: "#fff",
  },
  warning: {
    light: "#FFCF8C",
    main: "#FFB649",
    dark: "#F79000",
    contrastText: "#fff",
  },
  info: {
    light: "#74BFFF",
    main: "#42A5F5",
    dark: "#2C87D3",
    contrastText: "#fff",
  },
  success: {
    light: "#69DDA1",
    main: "#43C478",
    dark: "#2AA158",
    contrastText: "#fff",
  },
  grey: {
    50: "#F8F9FA",
    100: "#F0F2F5",
    200: "#E4E7EB",
    300: "#CED4DA",
    400: "#9EA9B3",
    500: "#6C757D",
    600: "#495057",
    700: "#3D4348",
    800: "#2C3035",
    900: "#1A1D21",
  },
  background: {
    default: "#121924", // Темно-синій фон
    paper: "#1E263A", // Темно-синій для карток
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.75)",
    disabled: "rgba(255, 255, 255, 0.45)",
  },
  divider: "rgba(255, 255, 255, 0.1)",
  action: {
    active: "rgba(89, 137, 255, 0.7)",
    hover: "rgba(89, 137, 255, 0.08)",
    selected: "rgba(89, 137, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
  },
};

// Створення тем
export const lightTheme = createTheme({
  ...commonTheme,
  palette: lightPalette,
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: darkPalette,
});
