export const getSerialNumber = (currentindex, pagecount, rowsPerPage) => {
    return (pagecount - 1) * rowsPerPage + currentindex + 1
}