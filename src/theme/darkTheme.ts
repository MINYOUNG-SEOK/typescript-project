import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fb5b82",
        },
        secondary: {
            main: "#ffffff",
        },
        background: {
            default: "#1c1c1e",
            paper: "#2c2c2e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
        },
        action: {
            hover: "#3a3a3c",
            active: "#48484a",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            fontWeight: 700,
            fontSize: "24px",
        },
        h2: {
            fontSize: "1rem",
        },
        body1: {
            fontSize: "14px",
        },
        subtitle1: {
            fontSize: "0.6875rem",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "30px",
                    textTransform: "none",
                },
                containedPrimary: {
                    backgroundColor: "#fb5b82",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: "#fc668c",
                    },
                },
                containedSecondary: {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "#e0e0e0",
                    },
                },
                sizeLarge: {
                    padding: "8px 32px",
                    fontWeight: 700,
                    fontSize: "16px",
                },
            },
        },
    },
});

export default theme;