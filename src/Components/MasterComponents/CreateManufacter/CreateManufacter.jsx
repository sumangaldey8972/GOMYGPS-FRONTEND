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
import { FormHelperText, IconButton, ModalClose, styled } from '@mui/joy';
import Snackbars from '../../../common/SnackBar/SnackBar';
import { useCreateManufacture } from '../../../hooks/useManufacture';

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

const AddManufacture = ({ open, setOpen }) => {
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
        name: '',
        address: '',
        gst: '',
        opening_stock: '',
        country: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Manufacurer name is required'),
        address: Yup.string().required("Address is required"),
        gst: Yup.string().required("GST Number is required"),
        opening_stock: Yup.string().required("Opening Stock is required"),
    })

    const { isLoading, mutate: add_manufacture } = useCreateManufacture()

    const handleAddManufacture = (details) => {
        add_manufacture(details, {
            onSuccess: (response) => {
                if (response.status) {
                    setToastMessage({
                        bool: true,
                        message: response.message,
                        status: "success"
                    })
                    setOpen(false)
                } else {
                    setToastMessage({
                        bool: true,
                        message: response.message,
                        status: "error"
                    })
                }
            }
        })
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
                        Add New Manufacture
                    </Typography>
                    <Formik initialValues={initialValue} validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            handleAddManufacture(values)
                            setSubmitting(false)
                        }}
                    >{({ errors, touched, values, setFieldValue }) => {
                        return (
                            <Form>
                                <Stack spacing={2}>
                                    <MaterialInput
                                        type="text"
                                        label="Manufacturer Name"
                                        name="name"
                                        size="sm"
                                    />
                                    <MaterialInput
                                        type="text"
                                        label="Address"
                                        name="address"
                                        size="sm"
                                    />
                                    <MaterialInput
                                        type="text"
                                        label="GST Number"
                                        name="gst"
                                        size="sm"
                                    />
                                    <MaterialInput
                                        type="text"
                                        label="Opening Stock"
                                        name="opening_stock"
                                        size="sm"
                                    />
                                    <Button loading={isLoading} type="submit" size="sm" color="primary" sx={{ borderRadius: '0' }} >
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

export default AddManufacture