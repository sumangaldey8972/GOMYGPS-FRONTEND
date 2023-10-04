import React, { Suspense } from 'react'
import { Navigate, useRoutes } from "react-router-dom"
import LoginPage from '../Pages/LoginPages/LoginPage'
import { Box, CircularProgress } from "@mui/material";
import MasterPage from '../Pages/MasterPage/MasterPage';
import OrdersPage from '../Pages/OrdersPage/OrdersPage';
import DashboardLayout from '../common/Layout/DashboardLayout';
import DevicePage from '../Pages/DevicePage/DevicePage';

const Routes = () => {
    const routes = useRoutes([
        { path: '/login', element: <LoginPage /> },
        {
            path: '/', element: <DashboardLayout />, children: [
                { element: <Navigate to='/manufacture' />, index: true },
                { path: 'manufacture', element: <MasterPage /> },
                { path: 'order', element: <OrdersPage /> },
                { path: 'devices', element: <DevicePage /> }
            ]
        },
    ])

    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress
                        sx={{ fontSize: "5rem", height: "10rem", width: "10rem" }}
                    />
                </Box>
            }
        >
            {routes}
        </Suspense>
    )
}

export default Routes