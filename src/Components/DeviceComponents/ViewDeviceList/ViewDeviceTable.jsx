import React from 'react'
import { ColorPaletteProp } from '@mui/joy/styles';
import { Avatar, Box, Checkbox, Chip, Link, Sheet, Table, Typography } from '@mui/joy';
import { getSerialNumber } from '../../../utils/serialNumber';

const ViewDeviceTable = ({ data, rowsPerPage, pageCount }) => {
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
                        <th style={{ width: 140, padding: '12px 6px' }}>VLTD No.</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Purchase</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Bill</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Device</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Manufacturer</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>ICCID</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>IMEI</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Make</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Airtel</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>BSNL</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((el, id) => (
                        <tr key={id}>
                            <td>
                                <Typography level="body-xs">{getSerialNumber(id, pageCount, rowsPerPage)}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.vltd_number ? el.vltd_number : "--"}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.purchase_date ? new Date(el.purchase_date).toLocaleDateString('en-GB') : "--"}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.bill_number ? el.bill_number : "--"}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.device_name ? el.device_name : "--"}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{el.manufacturer_name ? el.manufacturer_name : "--"}</Typography>

                            </td>
                            <td>
                                <Typography level="body-xs">{el.iccid ? el.iccid : "--"}</Typography>

                            </td><td>
                                <Typography level="body-xs">{el.imei ? el.imei : "--"}</Typography>

                            </td><td>
                                <Typography level="body-xs">{el.make ? el.make : "--"}</Typography>

                            </td><td>
                                <Typography level="body-xs">{el.airtel ? el.airtel : "--"}</Typography>

                            </td><td>
                                <Typography level="body-xs">{el.bsnl ? el.bsnl : "--"}</Typography>

                            </td><td>
                                <Typography level="body-xs">{el.expiry_date ? new Date(el.expiry_date).toLocaleDateString('en-GB') : "--"}</Typography>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default ViewDeviceTable