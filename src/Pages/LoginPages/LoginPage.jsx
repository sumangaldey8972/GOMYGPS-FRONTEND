import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import * as Yup from 'yup'
import { Form, Formik, useField } from "formik";
import { FormHelperText } from "@mui/joy";
import { useLoginUser } from '../../hooks/useAuth';
import { useDispatch } from "react-redux"
import { login_action } from '../../Redux/Auth/auth.action';
import Snackbars from '../../common/SnackBar/SnackBar';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {

    const [toastMessage, setToastMessage] = React.useState({
        bool: false,
        message: "",
        status: "",
    });
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setToastMessage({ bool: false, message: toastMessage.message, status: toastMessage.status });
    };
    const [showPassword, setShowPassword] = React.useState(true)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const initialValues = {
        email_id: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email_id: Yup.string().email("Invalid Email id").required('Email Id is required'),
        password: Yup.string().required('Password is required')
    })

    const MaterialInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (<FormControl>
            <FormLabel >
                {label} &nbsp;<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input {...field} {...props} autoComplete="off" sx={{ borderRadius: '0' }} />
            {meta.touched && meta.error && (
                <FormHelperText sx={{ color: "red", fontSize: '.6rem' }}>
                    {meta.error}
                </FormHelperText>
            )}
        </FormControl>)
    }

    const dispatch = useDispatch()

    const { isLoading, mutate: login_user } = useLoginUser()
    const navigate = useNavigate()

    const handleLogin = (creds) => {
        login_user(creds, {
            onSuccess: (res) => {
                dispatch(login_action(res))
                if (res.status) {
                    setToastMessage({
                        bool: true,
                        message: res.message,
                        status: "success"
                    })
                    navigate('/')
                } else {
                    setToastMessage({
                        bool: true,
                        message: res.message,
                        status: "error"
                    })
                }
            }
        })
    }

    return (
        <React.Fragment>
            <Snackbars
                handleClose={handleCloseSnackbar}
                message={toastMessage.message}
                open={toastMessage.bool}
                status={toastMessage.status}
            />
            <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        ':root': {
                            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                            '--Cover-width': '50vw', // must be `vw` only
                            '--Form-maxWidth': '800px',
                            '--Transition-duration': '0.4s', // set to `none` to disable transition
                        },
                    }}
                />
                <Box
                    sx={(theme) => ({
                        width:
                            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                        transition: 'width var(--Transition-duration)',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(255 255 255 / 0.2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundColor: 'rgba(19 19 24 / 0.4)',
                        },
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100dvh',
                            width:
                                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                            maxWidth: '100%',
                            px: 2,
                        }}
                    >
                        <Box
                            component="header"
                            sx={{
                                py: 3,
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    gap: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton variant="soft" color="primary" size="sm">
                                    <BadgeRoundedIcon />
                                </IconButton>
                                <Typography level="title-lg">GO-MY-GPS</Typography>
                            </Box>
                            {/* <ColorSchemeToggle /> */}
                        </Box>
                        <Box
                            component="main"
                            sx={{
                                my: 'auto',
                                py: 2,
                                pb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: 400,
                                maxWidth: '100%',
                                mx: 'auto',
                                borderRadius: 'sm',
                                '& form': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                },
                                [`& .${formLabelClasses.asterisk}`]: {
                                    visibility: 'hidden',
                                },
                            }}
                        >
                            <Stack gap={4} sx={{ mb: 2 }}>
                                <Stack gap={1}>
                                    <Typography level="h3">Sign in</Typography>
                                    {/* <Typography level="body-sm">
                                    New to company?{' '}
                                    <Link href="#replace-with-a-link" level="title-sm">
                                        Sign up!
                                    </Link>
                                </Typography> */}
                                </Stack>

                                {/* <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                            // startDecorator={<GoogleIcon />}
                            >
                                Continue with Google
                            </Button> */}
                            </Stack>
                            <Divider
                                sx={(theme) => ({
                                    [theme.getColorSchemeSelector('light')]: {
                                        color: { xs: '#FFF', md: 'text.tertiary' },
                                        '--Divider-lineColor': {
                                            xs: '#FFF',
                                            md: 'var(--joy-palette-divider)',
                                        },
                                    },
                                })}
                            >
                                {/* or */}
                            </Divider>
                            <Formik initialValues={initialValues} validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    console.log(values)
                                    handleLogin(values)
                                }}
                            >{({ values, touched, errors }) => {
                                return (
                                    <Form>
                                        <Stack gap={4} sx={{ mt: 2 }}>
                                            <MaterialInput
                                                type='email'
                                                name='email_id'
                                                label="Email"
                                                startDecorator={<EmailIcon />}
                                            />
                                            <MaterialInput
                                                type={showPassword ? 'password' : 'text'}
                                                name='password'
                                                label="Password"
                                                startDecorator={<KeyIcon />}
                                                endDecorator={<IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    variant="plain"
                                                    color="neutral"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>}
                                            />
                                            <Stack gap={4} sx={{ mt: 2 }}>
                                                {/* <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Checkbox size="sm" label="Remember me" name="persistent" />
                                        <Link level="title-sm" href="#replace-with-a-link">
                                            Forgot your password?
                                        </Link>
                                    </Box> */}
                                                <Button type="submit" loading={isLoading} onClick={() => console.log(errors)} fullWidth sx={{ borderRadius: '0' }} >
                                                    Sign in
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Form>
                                )
                            }}

                            </Formik>
                        </Box>
                        <Box component="footer" sx={{ py: 3 }}>
                            <Typography level="body-xs" textAlign="center">
                                © GO-MY-GPS {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={(theme) => ({
                        height: '100%',
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                        transition:
                            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        backgroundColor: 'background.level1',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                        },
                    })}
                />
            </CssVarsProvider>
        </React.Fragment>
    );
}
