import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'DM Sans', sans-serif`,
        body: `'DM Sans', sans-serif`,
    },
    styles: {
        global: {
            body: {
                bg: '#f8f9fa',
                color: '#000',
            },
        },
    },
});

export default theme;
