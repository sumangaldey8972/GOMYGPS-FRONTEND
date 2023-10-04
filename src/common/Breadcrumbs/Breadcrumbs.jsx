import { Box, Breadcrumbs, Link, Typography } from '@mui/joy'
import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const CustomeBreadcrums = ({ value }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
            >
                <Link
                    underline="none"
                    color="neutral"
                    href="#some-link"
                    aria-label="Home"
                >
                    <HomeRoundedIcon />
                </Link>
                <Typography color="primary" fontWeight={500} fontSize={12}>
                    {value}
                </Typography>
            </Breadcrumbs>
        </Box>
    )
}

export default CustomeBreadcrums