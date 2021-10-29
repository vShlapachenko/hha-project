import React from 'react';
import Avatar from '@mui/material/Avatar';
import "./user_profile.css"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

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
    <Box sx={{width: 500, height: 800}}>   
      {/* {profileImage && <Avatar alt={firstName} src={profileImage} sx={{ width: 100, height: 100 }} />} */}
    
      {/* <Chip label={department}/> */}

      <h3 className="header" >User Profile</h3>

      <TextField
        className="text"
        label="First Name"
        defaultValue={firstName}
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        className="text"
        label="Last Name"
        defaultValue={lastName} 
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        className="text"
        label="Email"
        defaultValue={email} 
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        className="text"
        label="Staff Number"
        defaultValue={staffNumber}
        InputProps={{
          readOnly: true
        }}
      />

      <Box p={2} ml={18}>
        <Button href={"./forgotPassword"} variant="contained">Change Password</Button>
      </Box>
      
    </Box>
    )
  }
  
   
  export default Profile;