import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { Box, Container, ModalClose, styled } from '@mui/joy';
import Snackbars from '../../../common/SnackBar/SnackBar';
import { useCreateMultipleDevice } from '../../../hooks/useDevice';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDropzone } from 'react-dropzone';
import "./createmultipldevice.css"
import * as XLSX from "xlsx"


const StyledModal = styled(Modal)(({ theme }) => ({
    ".MuiModal-backdrop": {
        backgroundColor: "#000000",
        opacity: .3,
    },
    ".MuiModalDialog-root": {
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        width: "30%",
        borderRadius: '0',
        overflow: 'hidden',
        zIndex: 9
    }
}));

const CreateMultipleDevices = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedFiles, setSelectedFile] = React.useState(null)
    const [fileData, setFileData] = React.useState(null)
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

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    };

    const handleUpload = (selectedFiles) => {
        if (selectedFiles) {
            const file = selectedFiles;

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const headerName = ['VLTD NO', 'Purchase DATE', 'BILL NO', 'DEVICE NO', 'Manufacturer Name', 'ICCID', 'IMEI', 'MAKE SIM', 'AIRTEL', 'BSNL', 'EXP DATE'];

                const parsedData = XLSX.utils.sheet_to_json(sheet, {
                    header: headerName,
                    range: 1,
                    raw: false,
                    dateNF: 'dd-mm-yyyy',
                });

                const sanitizedData = parsedData.map((row) => {
                    const sanitizedRow = {};
                    headerName.forEach((header) => {
                        const sanitizedKey = header.replace(/\s+/g, '_').toLowerCase();
                        if (sanitizedKey === 'purchase_date' || sanitizedKey === 'exp_date') {
                            if (row[header]) {
                                let formatted_date = row[header].split('/')[1] + '-' + row[header].split('/')[0] + '-' + row[header].split('/')[2];
                                sanitizedRow[sanitizedKey] = formatted_date;
                            } else {
                                sanitizedRow[sanitizedKey] = null;
                            }
                        } else if (sanitizedKey === 'vltd_no') {
                            sanitizedRow['vltd_number'] = row[header] || null;
                        } else if (sanitizedKey === 'bill_no') {
                            sanitizedRow['bill_number'] = row[header] || null
                        } else if (sanitizedKey === 'device_no') {
                            sanitizedRow['device_name'] = row[header] || null
                        } else if (sanitizedKey === 'make_sim') {
                            sanitizedRow['make'] = row[header] || null
                        } else {
                            sanitizedRow[sanitizedKey] = row[header] || null;
                        }
                    });
                    return sanitizedRow;
                });
                setFileData(sanitizedData);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    React.useEffect(() => {
        handleUpload(selectedFiles)
    }, [selectedFiles])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        acceptedFiles: ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
        multiple: false,
    });

    const { loading, mutate: createMultipleDevice } = useCreateMultipleDevice()

    const handleAddDevices = () => {
        console.log(fileData)
        createMultipleDevice(fileData, {
            onSuccess: (response) => {
                if (response.status) {
                    setToastMessage({
                        bool: true,
                        message: response.message,
                        status: "success"
                    })
                    setOpen(false)
                    setSelectedFile(null)
                    setFileData(null)
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

    return (
        <React.Fragment>
            <Snackbars
                status={toastMessage.status}
                message={toastMessage.message}
                open={toastMessage.bool}
                handleClose={handleClose}
            />
            <Button
                color="primary"
                startDecorator={<ArrowRightAltIcon sx={{ rotate: '90deg' }} />}
                size="sm"
                onClick={() => setOpen(true)}
                title="Add Devices via excel file"
            >
                Import Devices
            </Button>
            <StyledModal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                >
                    <ModalClose onClick={() => {
                        setSelectedFile(null)
                        setFileData(null)
                    }} />
                    <Typography id="basic-modal-dialog-title" component="h2">
                        Import Devices
                    </Typography>
                    <Container maxWidth="md" sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                        <Box sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            {
                                selectedFiles ?
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', }} >
                                        <Typography variant="h6" fontSize='1rem' color="#094178" component="div">
                                            {selectedFiles.name}
                                        </Typography>
                                        <Button size="sm"
                                            color="primary"
                                            onClick={handleAddDevices}
                                            loading={loading}
                                        > Upload</Button>
                                    </Box>
                                    :
                                    <section className="container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <div style={{ width: '60%' }} >
                                                <img src={"https://ssl.gstatic.com/docs/picker/images/upload_background.png"} className='upload_img' />
                                                <input {...getInputProps()} />
                                                <Typography variant="h6" fontSize='1rem' color="#094178" component="div">
                                                    Drag files here, or &nbsp;
                                                </Typography>
                                                <Button size="sm"
                                                    color="primary"
                                                > Browse</Button>
                                            </div>
                                        </div>
                                    </section>
                            }

                        </Box>
                    </Container>
                </ModalDialog>
            </StyledModal>
        </React.Fragment>
    );
}

export default CreateMultipleDevices
