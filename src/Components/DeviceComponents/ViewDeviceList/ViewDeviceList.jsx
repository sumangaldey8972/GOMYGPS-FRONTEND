import { Avatar, Box, Chip, Link, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const ViewDeviceList = ({ data }) => {
    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }} >
            {data?.map((el) => (
                <List
                    key={el._id}
                    size="sm"
                    sx={{
                        '--ListItem-paddingX': 0,
                    }}
                >
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                            <ListItemDecorator>
                                <Avatar size="sm">{el.device_name.split('')[0]}</Avatar>
                            </ListItemDecorator>
                            <div>
                                <Typography fontWeight={600} gutterBottom>
                                    Device Name : {el.device_name}
                                </Typography>
                                <Typography level="body-xs" gutterBottom>
                                    Purchase Date : {new Date(el.purchase_date).toLocaleDateString('en-GB')}
                                </Typography>
                                <Typography level="body-xs">Bill No : {el.bill_number} </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection:"column",
                                        // alignItems: '',
                                        // justifyContent: 'center',
                                        gap: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography level="body-xs"> Manufacturer : {el.manufacturer_name} </Typography>
                                    <Typography level="body-xs"> ICCID : {el.iccid} </Typography>
                                    <Typography level="body-xs"> IMEI : {el.imei} </Typography>
                                    <Typography level="body-xs"> Make : {el.make} </Typography>
                                    <Typography level="body-xs"> Airtel : {el.airtel} </Typography>
                                    <Typography level="body-xs"> BSNL : {el.bsnl} </Typography>
                                    <Typography level="body-xs"> Expiry Date : {new Date(el.expiry_date).toLocaleDateString('en-GB')} </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Link level="body-sm" component="button">

                                    </Link>
                                    {/* <RowMenu /> */}
                                </Box>
                            </div>
                        </ListItemContent>
                        <Chip
                            variant="soft"
                            size="sm"
                        // startDecorator={
                        //     {
                        //         Paid: <CheckRoundedIcon />,
                        //         Refunded: <AutorenewRoundedIcon />,
                        //         Cancelled: <BlockIcon />,
                        //     }[listItem.status]
                        // }
                        // color={
                        //     {
                        //         Paid: 'success',
                        //         Refunded: 'neutral',
                        //         Cancelled: 'danger',
                        //     }[listItem.status]
                        // }
                        >
                            --
                        </Chip>
                    </ListItem>
                    <ListDivider />
                </List>
            ))}
        </Box>
    )
}

export default ViewDeviceList