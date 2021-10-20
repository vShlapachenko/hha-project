import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

interface LeaderboardAttribute {
    FirstDepartmentName: string;
    SecondDepartmentName: string;
    ThirdDepartmentName: string;
    FirstPoints: string;
    SecondPoints: string;
    ThirdPoints: string;
}

const Leaderboard = ({FirstDepartmentName, SecondDepartmentName, ThirdDepartmentName, FirstPoints, SecondPoints, ThirdPoints}:LeaderboardAttribute) => {
    return (
      <Grid container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
         <Box
          sx={{
            width:300,
            height: 150,
            bgcolor: '#009CC4',
            boxShadow: 1,
            fontWeight: 'bold',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '12px'
          }}> 
          
          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              2nd Place
            </Typography>
          </div>

          <div>
            <Typography
              variant = "h4"
              my = {1}
              align = "center"  
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              {SecondDepartmentName}
            </Typography>
          </div>

          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              {SecondPoints} points
            </Typography>
          </div>
        </Box>

        <Box
          sx={{
            width:300,
            height: 150,
            bgcolor: '#823B8A',
            boxShadow: 1,
            fontWeight: 'bold',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '12px'
          }}> 
          
          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              1st Place
            </Typography>
          </div>

          <div>
            <Typography
              variant = "h4"
              my = {1}
              align = "center"  
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              {FirstDepartmentName}
            </Typography>
          </div>

          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
              color = "#FFFFFF"
            >
              {FirstPoints} points
            </Typography>
          </div>
        </Box>

        <Box
          sx={{
            width:300,
            height: 150,
            bgcolor: '#EEEEEE',
            boxShadow: 1,
            fontWeight: 'bold',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '12px'
          }}> 
          
          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
            >
              3rd Place
            </Typography>
          </div>

          <div>
            <Typography
              variant = "h4"
              my = {1}
              align = "center"  
              fontWeight = "bold"
            >
              {ThirdDepartmentName}
            </Typography>
          </div>

          <div>
            <Typography
              mt = {2}
              align = "center"
              fontWeight = "bold"
            >
              {ThirdPoints} points
            </Typography>
          </div>
        </Box>
        </Grid>
    );
};

export default Leaderboard;