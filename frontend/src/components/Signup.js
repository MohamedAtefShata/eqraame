import React from 'react';
import { Typography,Grid,TextField ,Box,Autocomplete} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { Button } from './Button';
import './Styles/Signup.css';
import axios from 'axios';
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
  const CssAutocomplete = styled(Autocomplete)({
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
  const options = ['Teacher', 'Student'];
function Signup(){
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const user = {
          name:data.get('name'),
          email:data.get('email'),
          password:data.get('password'),
          "confirm-password":data.get('password'),
          role:data.get('role'),
          birthdate:data.get('birthdate'),
          avatar:"default"
      }
      axios.post('http://localhost:5000/api/user/register',
      )
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
                    <Box component="form"
                    noValidate
                    onSubmit={handleSubmit} 
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
                        sign up to eqraame
                    </Typography>    
                    <div className='signup-btn'>              
                    <Button
                        className='btns' 
                        buttonStyle='btn--outline--scr'
                        buttonSize='btn--large'
                        buttonTrans='btn--scr'
                        buttonPath='/login'
                        >
                        continue with google
                        </Button>
                        <Button
                        className='btns' 
                        buttonStyle='btn--outline--scr'
                        buttonSize='btn--large'
                        buttonTrans='btn--scr'
                        buttonPath='/login'
                        >
                        continue with facebook
                        </Button>
                        </div>

                        <CssTextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        name="Name"
                        label="Name"
                        id="Name"
                        autoComplete="current-Name"
                        />
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
                        id="password"
                        autoComplete="current-password"
                        />
                        <Box
                        fullWidth
                        sx = {{display: "flex"}}
                        >
                        <CssAutocomplete
                            id="controllable-states-demo"
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            }}
                            
                            options={options}
                            sx={{mt:2, width: 300 , mr:1}}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                        />
                        
                        <CssTextField
                            id="date"
                            label="Birthday"
                            type="date"
                            
                            defaultValue="2017-05-24"
                            sx={{ mt:2 , width: 300}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </Box>
                        <div className='sign-btn'>
                          <Button
                            onClick="submit"
                            className='btns' 
                            buttonStyle='btn--primary--logsign'
                            buttonSize='btn--large'
                            buttonTrans='btn--logsign'
                            buttonPath='/signup'
                            >
                                sign up
                        </Button>
                        </div>
                        <Grid align="center">
                            <Grid item>
                                Already have account?
                                <Link href="/login" variant="body2">
                                 {"  Log In"}
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
export default Signup;

// Login /register gj
// Add course 
// Add leason 
// View courses 
// Buy course 
// My courses 
// My wallet 
// Profile (avatar, birthdate, )
// Searching 