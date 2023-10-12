import React from 'react'
import { ColorPaletteProp } from '@mui/joy/styles';
import { Avatar, Box, Checkbox, Chip, Link, Sheet, Table, Typography } from '@mui/joy';
import { getSerialNumber } from '../../../utils/serialNumber';

const ViewManufactureTable = ({ data, rowsPerPage, pageCount }) => {
    return (
        <Sheet
            className="OrderTableContainer"
            variant="outlined"
            sx={{
                display: { xs: 'none', sm: 'initial' },
                width: '100%',
                borderRadius: 'sm',
                flexShrink: 1,
                overflow: 'auto',
                minHeight: 0,
            }}
        >
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                    '--TableCell-headBackground': '#ccd7ff',
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': '#e7ecff',
                    '--TableCell-paddingY': '4px',
                    '--TableCell-paddingX': '8px',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: 120, padding: '12px 6px' }}>#</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>GST No.</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Opening Stock</th>
                        <th style={{ width: 140, padding: '12px 6px' }}> Address </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((el, id) => (
                        <tr key={id}>
                            <td>
                                <Typography level="body-xs">{getSerialNumber(id, pageCount, rowsPerPage)}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.manufacturer_name ? el.manufacturer_name : "--"}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.manufacturer_gst ? el.manufacturer_gst : "--"}</Typography>

                            </td>
                            <td>
                                <Typography level="body-xs">{el.opening_stock ? el.opening_stock : "--"}</Typography>
                            </td>
                            <td>
                                {/* <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}> */}
                                <Typography level="body-xs">{el.manufacturer_address ? el.manufacturer_address : "--"}</Typography>

                                {/* </Box> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default ViewManufactureTable