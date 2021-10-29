import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'
import { Alert } from "@mui/material";

interface InputAttributes {
  userInput: string,
  type: string,
  error?: boolean,
  errorMessage?: string,
  label: string
  onChangeFunc: any,
  
}

const Input = ({userInput, type, error = false, errorMessage = '', label, onChangeFunc }: InputAttributes) => {
  
  return (
      <div>   
        <FormControl >
          <TextField onChange={onChangeFunc} type={type} id="filled-basic" label={label} variant="filled" />
          {error &&  <FormHelperText  id="component-error-text">{userInput}</FormHelperText>}
        </FormControl>
      </div>
  )
}

 
export default Input;