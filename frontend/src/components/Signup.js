import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

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
    const [loading, setLoading] = React.useState(true);
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
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
                    <Typography align="center" variant="h6">
                        signup to eqraame 
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
                                signup
                        </Button>
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