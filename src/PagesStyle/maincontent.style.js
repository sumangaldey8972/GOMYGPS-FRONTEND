import { createTheme } from "@mui/material";


export const mainContentStyle = createTheme({
    maincontent: {
        px: {
            xs: 2,
            md: 6,
        },
        pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
        },
        pb: {
            xs: 2,
            sm: 2,
            md: 3,
        },
        mt: {
            md: 7
        },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '90dvh',
        gap: 1,
    },
    secondcontent: {
        display: 'flex',
        my: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})