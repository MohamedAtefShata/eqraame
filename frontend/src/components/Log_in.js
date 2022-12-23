import React from 'react';
import { Button } from './Button';
import { Typography,TextField,Grid,Box } from '@mui/material';
import Link from '@mui/material/Link';
import { ThemeProvider, createTheme,styled } from '@mui/material/styles';
import './Styles/Log_in.css';
import axios from 'axios';
const theme = createTheme({
    palette: {
        neutral: {
        main: '#ffc728',
        contrastText: '#282828',
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
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#282828',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#282828',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#282828',
      },
      '&:hover fieldset': {
        borderColor: '#282828',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#282828',
      },
    },
  });
function Log_in(){
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const user = {
        email:data.get('email'),
        password:data.get('password')
      }
      axios.post('http://localhost:5000/api/auth',user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    };
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
                    <Box 
                    component="form"
                    onSubmit={handleSubmit} 
                    noValidate
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
                    <Typography align="start" variant="h6">
                        log in to your eqraame account
                    </Typography> 
                    <div className='login-btn'>                 
                      <Button 
                      className='btns' 
                      buttonStyle='btn--outline--scr'
                      buttonSize='btn--large'
                      buttonTrans='btn--scr'
                      buttonPath='/login'> 
                      {/* <img className='googl-icon' src='./icons/google-icon.png' alt=''/> */}
                      continue with google
                      </Button>
                      <Button 
                      className='btns' 
                      buttonStyle='btn--outline--scr'
                      buttonSize='btn--large'
                      buttonTrans='btn--scr'
                      buttonPath='/login'> 
                      continue with facebook
                      </Button>
                      </div>
                        <CssTextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                        <CssTextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                        <div className='log-btn'>
                          <Button                   
                            onClick = 'submit'
                            className='btns' 
                            buttonStyle='btn--primary--logsign'
                            buttonSize='btn--large'
                            buttonTrans='btn--logsign'
                            buttonPath='/myprofile'
                            >
                                log in
                        </Button>
                        </div>
                        <Grid align="center">
                            <Grid item>
                                Don't have an account?
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