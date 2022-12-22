import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
        main: '#ffc107',
        contrastText: '#212121',
        },
    },
    typography: {
        allVariants: {
        fontFamily: 'PT Sans',
          textTransform: 'none',
          fontSize: 16,
        },
    },
  });

function Log_in(){
    const [loading, setLoading] = React.useState(true);
    const handleClick = (event) =>{
        setLoading(!loading);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    }
    
    return(
        <>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
        ><Grid item xs={3}>
            <ThemeProvider theme={theme}>
                    <Box component="form"
                    sx={{
                        mx: 'auto',
                        width: 500,
                        p: 1,
                        m: 1,
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                    }} 
                    > 
                    <Typography align="center" variant="h6">
                        log in to your eqraame account
                    </Typography>                  
                    <Button
                        sx={{mt: 2}}
                        fullWidth
                        onClick={handleClick}
                        loading={!loading}
                        variant="outlined"
                        loadingPosition="end"
                        type="submit"
                        >
                        continue with google
                        </Button>
                        <LoadingButton
                        sx={{mt: 2}}
                        fullWidth
                        onClick={handleClick}
                        loading={!loading}
                        variant="outlined"
                        loadingPosition="end"
                        type="submit"
                        >
                        continue with facebook
                        </LoadingButton>
                        <TextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                        <Button
                            sx={{mt: 2}}
                            margin = "normal"
                            color="neutral"
                            fullWidth
                            onClick={handleClick}
                            loading={!loading}
                            variant="contained"
                            loadingPosition="end"
                            type="submit"
                            >
                                login
                        </Button>
                        <Grid align="center">
                            <Grid item>
                                Don't have an account ?
                                <Link href="/signup" variant="body2">
                                 {"  Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>  
                    </Box>
                    </ThemeProvider>
                </Grid>
            </Grid>  
        </>
    )
}
export default Log_in;