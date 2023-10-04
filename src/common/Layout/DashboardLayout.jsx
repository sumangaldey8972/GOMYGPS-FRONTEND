import { Box } from '@mui/joy'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }} >
            <Navbar />
            <SideBar />

            <Outlet />
        </Box>
    )
}

export default DashboardLayout