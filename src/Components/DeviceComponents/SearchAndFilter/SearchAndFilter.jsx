import { Box, FormControl, FormLabel, Input } from '@mui/joy'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchAndFilter = ({ search, setSearch }) => {
    return (
        <Box
            className="SearchAndFilters-tabletUp"
            sx={{
                borderRadius: 'sm',
                py: 2,
                display: {
                    xs: 'flex',
                    sm: 'flex',
                },
                flexWrap: 'wrap',
                gap: 1.5,
                '& > *': {
                    minWidth: {
                        xs: '120px',
                        md: '160px',
                    },
                },
            }}
        >
            <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>Search for Device name</FormLabel>
                <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} value={search} onChange={(event) => setSearch(event.target.value)} />
            </FormControl>
            <FormControl sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} size="sm">
                <FormLabel> &nbsp; </FormLabel>
            </FormControl>
        </Box>
    )
}

export default SearchAndFilter