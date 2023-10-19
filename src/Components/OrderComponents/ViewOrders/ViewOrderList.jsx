import { Avatar, Box, Chip, Link, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const ViewOrderList = ({ data }) => {
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
                                <Avatar size="sm">{el.manufacturer_name ? el.manufacturer_name.split('')[0] : "--"}</Avatar>
                            </ListItemDecorator>
                            <div>
                                <Typography fontWeight={600} gutterBottom>
                                    Manufacturer Name : {el.manufacturer_name ? el.manufacturer_name : "--"}
                                </Typography>
                                <Typography level="body-xs" gutterBottom>
                                    Gst No : {el.manufacturer_gst ? el.manufacturer_gst : "--"}
                                </Typography>
                                <Typography level="body-xs">Opening Stock : {el.opening_stock ? el.opening_stock : "--"} </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography level="body-xs"> Address : {el.manufacturer_address ? el.manufacturer_address : "--"} </Typography>
                                    <Typography level="body-xs"></Typography>
                                    <Typography level="body-xs"></Typography>
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

export default ViewOrderList