import { Option, Select, Stack, iconButtonClasses } from '@mui/joy'
import React from 'react'
import { Pagination } from '@mui/material';

const TablePagination = ({ page, handleChange, count, rowsPerPage, handleRowsChange }) => {

    return (
        <Stack spacing={2} flexDirection="row" sx={{
            m: 'auto', pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
            display: {
                xs: "none",
                md: "flex"
            },
        }} >
            <Select size="sm" sx={{ borderRadius: '0' }} onChange={handleRowsChange} defaultValue={rowsPerPage} >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={30}>30</Option>
            </Select>
            <Pagination variant="outlined" color="primary" count={count} page={page} onChange={handleChange} />
        </Stack>
    )
}

export default TablePagination