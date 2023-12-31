import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/joy'
import CustomeBreadcrums from '../../common/Breadcrumbs/Breadcrumbs';
import { mainContentStyle } from '../../PagesStyle/maincontent.style';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchAndFilter from '../../Components/DeviceComponents/SearchAndFilter/SearchAndFilter';
import ViewDeviceTable from '../../Components/DeviceComponents/ViewDeviceList/ViewDeviceTable';
import ViewDeviceList from '../../Components/DeviceComponents/ViewDeviceList/ViewDeviceList';
import TablePagination from '../../common/Pagination/TablePagination';
import ListPagination from '../../common/Pagination/ListPagination';
import { useGetDeviceList } from '../../hooks/useDevice';
import AddSingleDevice from '../../Components/DeviceComponents/CreateDevices/CreateSingleDevice';
import CreateMultipleDevices from '../../Components/DeviceComponents/CreateDevices/CreateMultipleDevices';

const DevicePage = () => {
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

    const { islLoading, data } = useGetDeviceList(page, rowsPerPage, debounceSearch)
    return (
        <React.Fragment>
            <Box
                component="main"
                className="MainContent"
                sx={mainContentStyle.maincontent}
            >
                <CustomeBreadcrums value="Devices" />
                <Box
                    sx={mainContentStyle.secondcontent}
                >
                    <Typography level="h2">Devices</Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'column', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }} >
                        <CreateMultipleDevices />
                        <Button
                            color="primary"
                            startDecorator={<AddCircleOutlineIcon />}
                            size="sm"
                            title='Create Single Device'
                            onClick={() => setOpen(true)}
                        >
                            New Device
                        </Button>
                        <AddSingleDevice open={open} setOpen={setOpen} />
                    </Box>
                </Box>

                <SearchAndFilter search={search} setSearch={setSearch} />
                {
                    islLoading ? <CircularProgress thickness={3} sx={{ height: '10rem', width: '10rem', fontSize: '9rem', m: 'auto' }} /> :
                        <React.Fragment>
                            <ViewDeviceTable data={data?.body?.docs} rowsPerPage={rowsPerPage} pageCount={page} />
                            <TablePagination page={page} count={data?.body?.totalPages} handleChange={handleChange} rowsPerPage={rowsPerPage} handleRowsChange={handleRowsChange} />
                        </React.Fragment>
                }

                {
                    islLoading ? <CircularProgress thickness={3} sx={{ height: '10rem', width: '10rem', fontSize: '9rem', m: 'auto' }} /> :
                        <>
                            <ViewDeviceList data={data?.body?.docs} />
                            <ListPagination totalPages={data?.body?.totalPages} page={page} setPage={setPage} />
                        </>
                }

            </Box>
        </React.Fragment>
    )
}

export default DevicePage