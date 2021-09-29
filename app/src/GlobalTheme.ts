import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
require('typeface-roboto'); 

export const GlobalTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        body1: {
            fontFamily: 'Roboto',
            fontWeight: 500,
        }
    }
});
