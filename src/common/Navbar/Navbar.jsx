import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
// import ColorSchemeToggle from './ColorSchemeToggle';
import { toggleSidebar } from '../../utils/sidebar';
import { Stack, Typography } from "@mui/joy"
import { useDestroySession } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate()


    const { mutate: sessionDestroyer } = useDestroySession()

    const handleDestroySession = () => {
        sessionDestroyer("", {
            onSuccess: (response) => {
                if (response.status) {
                    navigate('/login')
                }
            }
        })
    }

    return (
        <Sheet
            sx={{
                display: { xs: 'flex', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: 'var(--Header-height)',
                zIndex: 1111,
                p: 2,
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'background.level1',
                boxShadow: 'sm',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px',
                        [theme.breakpoints.up('md')]: {
                            '--Header-height': '52px',
                        },
                    },
                })}
            />
            <Stack flexDirection="row" sx={{ gap: { xs: 2, md: 18 }, alignItems: 'center' }} >
                <IconButton
                    onClick={() => toggleSidebar()}
                    variant="outlined"
                    color="neutral"
                    size="sm"
                >
                    <MenuIcon />
                </IconButton>
                <Typography role="presentation" sx={{ fontWeight: 'lg' }} > GOMYGPS </Typography>
            </Stack>
            <IconButton
                // onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
                onClick={handleDestroySession}
                title="click to logout"
            >
                <LogoutIcon />
            </IconButton>
        </Sheet>
    );
}
