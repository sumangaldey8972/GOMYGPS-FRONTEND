import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import { NavLink as RouterLink } from "react-router-dom"
import { closeSidebar } from '../../utils/sidebar';
import { sidebarList } from './sidebar.config';

export default function SideBar() {

    return (
        <React.Fragment>
            <Box
                className="SecondSidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Sheet
                className="SecondSidebar"
                color="neutral"
                sx={{
                    position: {
                        xs: 'fixed',
                        lg: 'sticky',
                    },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'none',
                    },
                    transition: 'transform 0.4s',
                    zIndex: 9999,
                    height: '100dvh',
                    top: 0,
                    p: 2,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <List
                    size="sm"
                    sx={{
                        '--ListItem-radius': '6px',
                        '--List-gap': '6px',
                    }}
                >
                    <ListSubheader role="presentation" sx={{ fontWeight: 'lg' }}>
                        Dashboard
                    </ListSubheader>
                    {
                        sidebarList.map((el, i) => {
                            return (
                                <ListItem key={i} >
                                    <ListItemButton component={RouterLink}
                                        to={el.path} sx={{
                                            borderRadius: 2,
                                            "&.active": {
                                                color: "white",
                                                bgcolor: "#0B6BCB",
                                            },
                                        }} >
                                        <ListItemDecorator>
                                            {el.icon}
                                        </ListItemDecorator>
                                        <ListItemContent>{el.title}</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Sheet>
        </React.Fragment>
    );
}