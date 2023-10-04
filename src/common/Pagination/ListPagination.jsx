import { Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ListPagination = ({ totalPages, page, setPage }) => {
    return (
        <Box
            className="Pagination-mobile"
            sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
        >
            <IconButton
                aria-label="previous page"
                variant="outlined"
                color="neutral"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography level="body-sm" mx="auto">
                Page {page} of {totalPages}
            </Typography>
            <IconButton
                aria-label="next page"
                variant="outlined"
                color="neutral"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                <KeyboardArrowRightIcon />
            </IconButton>
        </Box>
    )
}

export default ListPagination