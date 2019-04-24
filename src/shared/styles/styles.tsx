import { createMuiTheme } from '@material-ui/core';

interface AppStyles {
    [key: string]: React.CSSProperties | undefined;
}

export const appStyles: AppStyles = {
    primaryButton: {
        margin: '0.25rem 0.1rem',
    },
    modalCentered: {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
};

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#800080',
        },
    },
});
