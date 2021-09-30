import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, SubmitHandler } from "react-hook-form";

interface InputAttributes {
  userInput: string;
}

const Input = ({userInput}: InputAttributes) => {
  
  const handleChange = (event: any) => {
    event.preventDefault();
    userInput = event.target.value;
  };
  return (
      <div>
              <TextField onChangeCapture = {handleChange} id="filled-basic" label="input here" variant="filled" />
      </div>
  )
}

 
export default Input;