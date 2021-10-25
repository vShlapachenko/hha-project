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

const useStyles = makeStyles({
  text: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: '20 20 20 20'
  },
  box: {
    background: '#EEEEEE',
  },
});
  
const Profile = ({firstName, lastName, email, staffNumber, profileImage, department}: ProfileAttributes) => {
    const classes = useStyles();
  return (
    <div>
    <h1>Profile</h1>

    <Box sx={{width: 660, height: 397, color: '#EEEEEE'} }>   
      {/* {profileImage && <Avatar alt={firstName} src={profileImage} sx={{ width: 100, height: 100 }} />} */}
    
      {/* <Chip label={department}/> */}

      <h3 className="header">Personal Information</h3>

      <TextField
       sx={{width: 316, height: 62}}
        className={classes.text}
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
        <Button variant="contained">Change Password</Button>
    </Box>

    </div>
    )
  }
  
   
  export default Profile;