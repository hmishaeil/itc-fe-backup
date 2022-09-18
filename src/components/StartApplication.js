import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://infotechcard.com/">
                InfoTechCard
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function StartApplication() {

    const [errors, setErrors] = useState({})

    const getStartedApi = process.env.REACT_APP_ITC_API_ENDPOINT.concat("/get-started");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        if (!validate(data)) return

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password')
            })
        };
        fetch(getStartedApi, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

    };

    const validate = (data) => {

        let errors = {}

        let email = data.get('email');
        if (email.length === 0) {
            errors.email = "Email field is required."
        } else if (!(/\S+@\S+\.\S+/).test(email)) {
            errors.email = "Email format is required."
        } else {
            errors.email = ""
        }

        errors.firstName = data.get('firstName') ? "" : "First Name field is required."
        errors.lastName = data.get('lastName') ? "" : "Last Name field is required"

        let password = data.get('password')
        if (password.length < 12) {
            errors.password = "Password must have at least 12 characters."
        } else if (!/[a-z]/.test(password)) {
            errors.password = "Password must include one lower case character."
        } else if (!/[A-Z]/.test(password)) {
            errors.password = "Password must include one upper case character."
        } else if (!/[0-9]/.test(password)) {
            errors.password = "Password must include one number."
        } else {
            errors.password = ""
        }

        setErrors({
            ...errors
        })

        return Object.values(errors).every(e => e === "")

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" sx={{ m: 5 }}>
                        Apply for InfoTechCard
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Work email address"
                                    name="email"
                                    autoComplete="email"
                                    {...(errors.email && { error: true, helperText: errors.email })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    {...(errors.firstName && { error: true, helperText: errors.firstName })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...(errors.lastName && { error: true, helperText: errors.lastName })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Choose a password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    helperText="At least 12 characters. Must include one lowercase character, uppercase character, number, and not be a commonly used password."
                                    {...(errors.password && { error: true, helperText: errors.password })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 7, mb: 2 }}
                        >
                            Start Application
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}