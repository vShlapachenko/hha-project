import React from 'react';
import Avatar from '@mui/material/Avatar';
import "./user_profile.css"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { makeStyles } from "@mui/styles";

interface ProfileAttributes {
  firstName: string,
  lastName: string,
  email: string,
  staffNumber: string,
  profileImage?: string,
  department?: string
}
  
const Profile = ({firstName, lastName, email, staffNumber, profileImage, department}: ProfileAttributes) => {
  return (
    <div>
      <h1 className="header-1">Profile</h1>

      <div className="InfoPane">
      
        <h3 className="header-2">Personal Information</h3>

        <div className="first_last_name">

          <div className="fisrt_name">
              <TextField
                sx={{width: "308px", height: "55px", background: '#FFFFFF', textSizeAdjust: "80%"}}
                label="First Name"
                defaultValue={firstName}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
          
          <div className="Last_Name">
              <TextField
                sx={{width: "308px", height: "55px", background: '#FFFFFF'}}
                label="Last Name"
                defaultValue={lastName} 
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
        
      </div>
      
      <div className="email_input">
        <TextField
        sx={{width: "488px", height: "55px", background: '#FFFFFF'}}
        label="Email"
        defaultValue={email} 
        InputProps={{
          readOnly: true,
        }}
      /></div>
      
      <div className="PSN_input">
        <TextField
          sx={{width: "488px", height: "55px", background: '#FFFFFF'}}
          className="text"
          label="Staff Number"
          defaultValue={staffNumber}
          InputProps={{
            readOnly: true
          }}
        />
      </div>
      
      <div className="change_pass_button">
        <Button 
        sx={{width: "488px", height: "55px", background: '#009CC4'}}
        variant="contained">Change Password</Button>
      </div>
        
    </div>

    </div>
    )
  }
  
   
  export default Profile;