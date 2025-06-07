import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ff2d55',
        },
    },
    typography: {
        fontFamily: "'SUIT', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                },
            },
        },
    },
});

export default lightTheme;