import * as React from 'react';
import * as Yup from 'yup'
import { Form, Formik, useField } from "formik";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FormHelperText, IconButton, ModalClose, Option, Select, styled } from '@mui/joy';
import Snackbars from '../../../common/SnackBar/SnackBar';
import { useCreateManufacture } from '../../../hooks/useManufacture';
import { ErrorMessage } from 'formik/dist';
import { useGetDeviceOption } from '../../../hooks/useDevice';
import DeviceOptionsInfiniteScroll from '../../../common/InfiniteScroll/DeviceOptionsInfiniteScroll';

const StyledModal = styled(Modal)(({ theme }) => ({
    ".MuiModal-backdrop": {
        backgroundColor: "#000000",
        opacity: .3,
    },
    ".MuiModalDialog-root": {
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        width: "30%",
        borderRadius: '0'
    }
}));

const CreateOrder = ({ open, setOpen }) => {
    // const [open, setOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState({
        bool: false,
        message: "",
        status: "",
    });
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setToastMessage({ bool: false, message: "", status: toastMessage.status });
    };

    const initialValue = {
        device_name: '',
        device_id: '',
        customer_name: '',
        mobile_number: '',
        rto_code: '',
        device_type: '',
        validity_in_years: ''
    }

    const validationSchema = Yup.object({
        device_name: Yup.string().required('Select Device to Proceed !'),
        customer_name: Yup.string().required("Customer Name is required !"),
        mobile_number: Yup.number().required("Mobile Number is required !"),
        rto_code: Yup.string().required("RTO Code is required !"),
        device_type: Yup.string().required('Select Device Type !'),
        validity_in_years: Yup.string().required('Select Validity Years !')
    })

    const [search, setSearch] = React.useState('')
    const { data: device_option, fetchNextPage: fetchDeviceOptions } = useGetDeviceOption(search)

    const handleCreateOrder = (details) => {

    }

    const MaterialInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (<FormControl>
            <FormLabel sx={{ fontSize: '.8rem', fontFamily: 'Noto Sans' }} >
                {label} &nbsp;<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input autoComplete="off" {...field} {...props} sx={{ borderRadius: '0' }} />
            {meta.touched && meta.error && (
                <FormHelperText sx={{ color: "red", fontSize: '.6rem' }}>
                    {meta.error}
                </FormHelperText>
            )}
        </FormControl>)
    }

    return (
        <React.Fragment>
            <Snackbars
                status={toastMessage.status}
                message={toastMessage.message}
                open={toastMessage.bool}
                handleClose={handleClose}
            />
            <StyledModal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{ maxWidth: 350 }}
                >
                    <ModalClose />
                    <Typography id="basic-modal-dialog-title" component="h2">
                        Create New Order
                    </Typography>
                    <Formik initialValues={initialValue} validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            handleCreateOrder(values)
                            setSubmitting(false)
                        }}
                    >{({ errors, touched, setFieldValue }) => {
                        return (
                            <Form>
                                <Stack spacing={2}>
                                    <DeviceOptionsInfiniteScroll
                                        data={device_option}
                                        name="device_name"
                                        searchValue={search}
                                        setSearch={setSearch}
                                        label="Select Device Name"
                                        onChange={(value) => {
                                            if (value === null) {
                                                setFieldValue('device_name', '');
                                                setFieldValue('device_id', '');
                                                setSearch('')
                                            } else {
                                                setFieldValue('device_name', value?.value);
                                                setFieldValue('device_id', value?.id);
                                                setSearch('')
                                            }
                                        }}
                                        error={errors.device_name}
                                        touched={touched.device_name}
                                        fetchNextPage={fetchDeviceOptions} />
                                    <MaterialInput
                                        type="text"
                                        label="Customer Name"
                                        name="customer_name"
                                        size="sm"
                                        autoComplete='off'
                                    />
                                    <MaterialInput
                                        type="number"
                                        label="Contact Number"
                                        name="mobile_number"
                                        size="sm"
                                        autoComplete='off'
                                    />
                                    <MaterialInput
                                        type="text"
                                        label="RTO Code"
                                        name="rto_code"
                                        size="sm"
                                        autoComplete='off'
                                    />
                                    <FormControl>
                                        <FormLabel sx={{ fontSize: '.8rem', fontFamily: 'Noto Sans' }}>
                                            Select Device Type
                                        </FormLabel>
                                        <Select
                                            onChange={(event, value) => setFieldValue('device_type', value)}
                                            sx={{ borderRadius: '0px' }}
                                            name="device_type"
                                        >
                                            <Option value="new">New Device</Option>
                                            <Option value="old">Old Device</Option>
                                        </Select>
                                        {
                                            touched.device_type && errors.device_type && (
                                                <FormHelperText sx={{ color: "red", fontSize: '.6rem' }}>
                                                    {errors.device_type}
                                                </FormHelperText>
                                            )
                                        }
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel sx={{ fontSize: '.8rem', fontFamily: 'Noto Sans' }}>
                                            Validity Years
                                        </FormLabel>
                                        <Select
                                            onChange={(event, value) => setFieldValue('validity_in_years', value)}
                                            sx={{ borderRadius: '0px' }}
                                            name="validity_in_years"
                                        >
                                            <Option value="1">1 year</Option>
                                            <Option value="2">2 Year</Option>
                                        </Select>
                                        {
                                            touched.validity_in_years && errors.validity_in_years && (
                                                <FormHelperText sx={{ color: "red", fontSize: '.6rem' }}>
                                                    {errors.validity_in_years}
                                                </FormHelperText>
                                            )
                                        }
                                    </FormControl>

                                    <Button loading={false} type="submit" size="sm" color="primary" sx={{ borderRadius: '0' }} >
                                        Submit
                                    </Button>
                                </Stack>
                            </Form>
                        )
                    }}
                    </Formik>
                </ModalDialog>
            </StyledModal>
        </React.Fragment>
    );
}

export default CreateOrder