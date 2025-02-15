import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   cssVariables: true,
//   typography: {
//     fontFamily: "'Manrope', sans-serif",
//     h1: {
//       fontSize: "2rem",
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: "1.8rem",
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "1rem",
//     },
//   },
//   palette: {
//     primary: {
//       main: "#1976d2", // Основний колір (наприклад, синій)
//       light: "#42a5f5",
//       dark: "#1565c0",
//     },
//     secondary: {
//       main: "#d32f2f", // Додатковий колір (наприклад, червоний)
//       light: "#ef5350",
//       dark: "#c62828",
//     },
//     background: {
//       default: "#e7ecf2", // Фон сторінки
//       paper: "#ffffff", // Фон для компонентів
//     },
//     text: {
//       primary: "#050505",
//       secondary: "#757575",
//     },
//   },
// });

// export default theme;

export const lightTheme = {
  cssVariables: true,

  palette: {
    mode: "light",
    primary: { main: "#00796B", contrastText: "#ffffff" },
    secondary: { main: "#FFB74D", contrastText: "#000000" },
    background: { default: "#ECEFF1", paper: "#FFFFFF" },
    text: { primary: "#212121", secondary: "#757575" },
    shadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "4px 4px 8px #c8d0e7, -4px -4px 8px #ffffff",
          "&:hover": {
            boxShadow: "2px 2px 4px #c8d0e7, -2px -2px 4px #ffffff",
          },
        },
      },
    },
  },
};

export const darkTheme = {
  cssVariables: true,

  palette: {
    mode: "dark",
    primary: { main: "#00ACC1", contrastText: "#ffffff" },
    secondary: { main: "#FF7043", contrastText: "#ffffff" },
    background: { default: "#212121", paper: "#2A2A2A" },
    text: { primary: "#ffffff", secondary: "#B0BEC5" },
    shadow: "8px 8px 16px #1a1a1a, -8px -8px 16px #2e2e2e",
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "4px 4px 8px #191919, -4px -4px 8px #2e2e2e",
          "&:hover": {
            boxShadow: "2px 2px 4px #191919, -2px -2px 4px #2e2e2e",
          },
        },
      },
    },
  },
};
