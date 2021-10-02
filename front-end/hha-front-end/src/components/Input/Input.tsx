import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'

interface InputAttributes {
  userInput: string,
  error?: boolean,
  errorMessage?: string,
  label: string
}

const Input = ({userInput, error = false, errorMessage = '', label}: InputAttributes) => {
  
  const handleChange = (event: any) => {
    event.preventDefault();
    userInput = event.target.value;
  };
  return (
      <div>   
        <FormControl >
          <TextField onChangeCapture = {handleChange} id="filled-basic" label={label} variant="filled" />
          {error &&  <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>}
        </FormControl>
      </div>
  )
}

 
export default Input;