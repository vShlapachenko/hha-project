import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

interface LeaderboardAttribute {
    departmentName: string;
}

const Leaderboard = ({departmentName}:LeaderboardAttribute) => {
    return (
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            width:300,
            height: 150,
            bgcolor: '#F5F8FF',
            boxShadow: 1,
            fontWeight: 'bold',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '12px'
          }}> 
          
          <div>
            <Typography
              mt = {2}
              color = "#787885"  
              align = "center"
              fontWeight = "bold"
            >
              Best Department of the month
            </Typography>
          </div>

          <div>
            <Typography
              variant = "h4"
              my = {2}
              align = "center"  
              fontWeight = "bold"
            >
              {departmentName}
            </Typography>
          </div>
        </Box>
        </Grid>
    );
};

export default Leaderboard;