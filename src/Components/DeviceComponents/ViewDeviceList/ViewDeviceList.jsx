import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Avatar, Box, Chip, Link, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Typography, accordionClasses } from '@mui/joy'
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
                                <Avatar size="sm">{el.device_name ? el.device_name.split('')[0] : "--"}</Avatar>
                            </ListItemDecorator>
                            <div>
                                <Typography fontWeight={600} gutterBottom>
                                    Device Name : {el.device_name ? el.device_name : "--"}
                                </Typography>
                                <Typography level="body-xs" gutterBottom>
                                    Purchase Date : {el.purchase_date ? new Date(el.purchase_date).toLocaleDateString('en-GB') : "--"}
                                </Typography>
                                <Typography level="body-xs">Bill No : {el.bill_number ? el.bill_number : "--"} </Typography>
                                <AccordionGroup sx={{
                                    maxWidth: 270,
                                    width: 270,
                                    [`& .${accordionClasses.root}`]: {
                                        marginTop: '0.5rem',
                                        transition: '0.2s ease',
                                        '& button:not([aria-expanded="true"])': {
                                            transition: '0.2s ease',
                                            paddingBottom: '0.625rem',
                                        },
                                        '& button:hover': {
                                            background: 'transparent',
                                        },
                                    },
                                }}>
                                    <Accordion>
                                        <AccordionSummary sx={{ fontSize: '.8rem' }} >View More..</AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: "column",
                                                    // alignItems: '',
                                                    // justifyContent: 'center',
                                                    gap: 0.5,
                                                    mb: 1,
                                                }}
                                            >
                                                <Typography level="body-xs"> Manufacturer : {el.manufacturer_name ? el.manufacturer_name : "--"} </Typography>
                                                <Typography level="body-xs"> ICCID : {el.iccid ? el.iccid : "--"} </Typography>
                                                <Typography level="body-xs"> IMEI : {el.imei ? el.imei : "--"} </Typography>
                                                <Typography level="body-xs"> Make-SIM : {el.make ? el.make : "--"} </Typography>
                                                <Typography level="body-xs"> Airtel : {el.airtel ? el.airtel : "--"} </Typography>
                                                <Typography level="body-xs"> BSNL : {el.bsnl ? el.bsnl : "--"} </Typography>
                                                <Typography level="body-xs"> Expiry Date : {el.expiry_date ? new Date(el.expiry_date).toLocaleDateString('en-GB') : "--"} </Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionGroup>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Link level="body-sm" component="button">

                                    </Link>
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