import React, { useEffect, useState } from 'react'
import SideBar from '../../common/Sidebar/Sidebar'
import Navbar from '../../common/Navbar/Navbar'
import { Box, Button, CircularProgress, Typography } from '@mui/joy'
import CustomeBreadcrums from '../../common/Breadcrumbs/Breadcrumbs';
import { mainContentStyle } from '../../PagesStyle/maincontent.style';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddManufacture from '../../Components/MasterComponents/CreateManufacter/CreateManufacter';
import SearchAndFilter from '../../Components/MasterComponents/SearchAndFilter/SearchAndFilter';
import { useGetManufacturList } from '../../hooks/useManufacture';
import ViewManufactureTable from '../../Components/MasterComponents/ViewManufactureList/ViewManufactureTable';
import ViewManufactureList from '../../Components/MasterComponents/ViewManufactureList/ViewManufactureList';
import TablePagination from '../../common/Pagination/TablePagination';
import ListPagination from '../../common/Pagination/ListPagination';

const MasterPage = () => {
    const [open, setOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = useState('')
    const [debounceSearch, setDebounceSearch] = useState('')

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebounceSearch(search)
        }, 2000)

        return () => clearTimeout(debounce)
    }, [search])

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleRowsChange = (event, value) => {
        setRowsPerPage(value)
    }

    const { islLoading, data } = useGetManufacturList(page, rowsPerPage, debounceSearch)
    return (
        <React.Fragment>
            <Box
                component="main"
                className="MainContent"
                sx={mainContentStyle.maincontent}
            >
                <CustomeBreadcrums value="Manufacture" />
                <Box
                    sx={mainContentStyle.secondcontent}
                >
                    <Typography level="h2">Manufactures</Typography>
                    <Button
                        color="primary"
                        startDecorator={<AddCircleOutlineIcon />}
                        size="sm"
                        title='Create manufacturer'
                        onClick={() => setOpen(true)}
                    >
                        Create
                    </Button>
                    <AddManufacture open={open} setOpen={setOpen} />
                </Box>

                <SearchAndFilter search={search} setSearch={setSearch} />
                {
                    islLoading ? <CircularProgress thickness={3} sx={{ height: '10rem', width: '10rem', fontSize: '9rem', m: 'auto' }} /> :
                        <React.Fragment>
                            <ViewManufactureTable data={data?.body?.docs} rowsPerPage={rowsPerPage} pageCount={page} />
                            <TablePagination page={page} count={data?.body?.totalPages} handleChange={handleChange} rowsPerPage={rowsPerPage} handleRowsChange={handleRowsChange} />
                        </React.Fragment>
                }

                {
                    islLoading ? <CircularProgress thickness={3} sx={{ height: '10rem', width: '10rem', fontSize: '9rem', m: 'auto' }} /> :
                        <>
                            <ViewManufactureList data={data?.body?.docs} />
                            <ListPagination totalPages={data?.body?.totalPages} page={page} setPage={setPage} />
                        </>
                }

            </Box>
        </React.Fragment>
    )
}

export default MasterPage