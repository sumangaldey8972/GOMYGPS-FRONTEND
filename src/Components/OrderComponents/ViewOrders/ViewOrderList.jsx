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
                                <Avatar size="sm">{el.device_name ? el.device_name.split('')[0] : "--"}</Avatar>
                            </ListItemDecorator>
                            <div>
                                <Typography fontWeight={600} gutterBottom>
                                    Device : {el.device_name ? el.device_name : "--"}
                                </Typography>
                                <Typography level="body-xs" gutterBottom>
                                    Customer Name : {el.customer_name ? el.customer_name : "--"}
                                </Typography>
                                <Typography level="body-xs">Mobile Number : {el.mobile_number ? el.mobile_number : "--"} </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        // justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography level="body-xs"> Device Type : {el.device_type ? el.device_type : "--"} </Typography>
                                    <Typography level="body-xs">RTO Code : {el.rto_code ? el.rto_code : "--"} </Typography>
                                    <Typography level="body-xs">Validity : {el.expiry_date ? new Date(el.expiry_date).toLocaleDateString('en-GB') : "--"} </Typography>
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