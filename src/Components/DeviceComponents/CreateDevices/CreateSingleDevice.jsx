import * as React from 'react';
import * as Yup from 'yup'
import { Form, Formik, useField } from "formik";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { FormHelperText, Grid, ModalClose, styled } from '@mui/joy';
import Snackbars from '../../../common/SnackBar/SnackBar';
import { useCreateDevice } from '../../../hooks/useDevice';

const StyledModal = styled(Modal)(({ theme }) => ({
    ".MuiModal-backdrop": {
        backgroundColor: "#000000",
        opacity: .3,
    },
    ".MuiModalDialog-root": {
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        width: "30%",
        borderRadius: '0',
        overflow: 'auto',
        zIndex: 9
    }
}));

const AddSingleDevice = ({ open, setOpen }) => {
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
        setToastMessage({ bool: false, message: toastMessage.message, status: toastMessage.status });
    };

    const initialValue = {
        vltd_number: '',
        purchase_date: '',
        bill_number: '',
        device_name: '',
        manufacturer_name: '',
        iccid: '',
        imei: '',
        make: '',
        airtel: '',
        bsnl: '',
        expiry_date: ''
    }

    const validationSchema = Yup.object({
        vltd_number: Yup.string().required('VLTD number is required'),
        purchase_date: Yup.string().required("Purchase Date is required"),
        bill_number: Yup.string().required("Bill Number is required"),
        device_name: Yup.string().required("Device Name is required"),
        manufacturer_name: Yup.string().required("Manufature Name is required"),
        iccid: Yup.string().required("ICCID Name is required"),
        imei: Yup.string().required("IMEI Name is required"),
        make: Yup.string().required("MAKE is required"),
        airtel: Yup.string().required("Airtel Number is required"),
        bsnl: Yup.string().required("BSNL Number is required"),
        expiry_date: Yup.string().required('Expiry Date is required')
    })

    const { isLoading, mutate: add_single_device } = useCreateDevice()

    const handleCreateSingleDevice = (details) => {
        add_single_device(details, {
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
            <FormLabel sx={{ fontSize: '.9rem' }} >
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
                // sx={{ maxWidth: 350 }}
                >
                    <ModalClose />
                    <Typography id="basic-modal-dialog-title" component="h2">
                        Add Device
                    </Typography>
                    <Formik initialValues={initialValue} validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            handleCreateSingleDevice(values)
                            setSubmitting(false)
                        }}
                    >{({ errors, touched, values, setFieldValue }) => {
                        return (
                            <Form>
                                <Grid container spacing={2} >
                                    {
                                        formFields.map((el, i) => (
                                            <Grid key={i} item="true" xs={12} sm={6} md={6} >
                                                <MaterialInput
                                                    type={el.type}
                                                    label={el.label}
                                                    placeholder={el.placeholder}
                                                    name={el.name} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <div style={{display:"flex",justifyContent:'center'}}> 
                                <Button loading={isLoading}  type="submit" size="sm" color="primary" sx={{ borderRadius: '0',marginTop:'10px' }} >
                                    Submit
                                </Button>
                                </div>
                                
                            </Form>
                        )
                    }}
                    </Formik>
                </ModalDialog>
            </StyledModal>
        </React.Fragment>
    );
}

export default AddSingleDevice


const formFields = [
    { type: "text", label: "VLTD Number", placeholder: 'Enter VLTD Number', name: 'vltd_number' },
    { type: "date", label: "Purchase Date", placeholder: '', name: 'purchase_date' },
    { type: "text", label: "Bill Number", placeholder: 'Enter Bill Number', name: 'bill_number' },
    { type: "text", label: "Device Name", placeholder: 'Enter Device Name', name: 'device_name' },
    { type: "text", label: "Manufacturer Name", placeholder: 'Select Manufacturer Name', name: 'manufacturer_name' },
    { type: "text", label: "ICC ID", placeholder: 'Enter ICC ID', name: 'iccid' },
    { type: "text", label: "IMEI Number", placeholder: 'Enter IMEI Number', name: 'imei' },
    { type: "text", label: "Make", placeholder: 'Enter MAKE', name: 'make' },
    { type: "text", label: "Airtel", placeholder: 'Enter Airtel Number', name: 'airtel' },
    { type: "text", label: "BSNL", placeholder: 'Enter BSNL Number', name: 'bsnl' },
    { type: "date", label: "Expiry Date", placeholder: '', name: 'expiry_date' },
]