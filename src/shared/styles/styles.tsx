import { createMuiTheme } from '@material-ui/core';

interface AppClasses {
    primaryButton: React.CSSProperties;
    modalCentered: React.CSSProperties;
    card: React.CSSProperties;
}

export const appClasses: AppClasses = {
    primaryButton: {
        margin: '0.25rem 0.1rem',
    },
    modalCentered: {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
    card: {
        width: '30rem',
        margin: '0.5rem auto',
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#800080',
        },
    },
    typography: {
        useNextVariants: true,
    },
});
