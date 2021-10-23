import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'


interface ToDoAttribute{
    firstLine: string;
    secondLine: string;
    thirdLine: string;
}

const ToDo = ({firstLine, secondLine, thirdLine}:ToDoAttribute) => {

    return(
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box mx={5}
        textAlign='center'
          sx={{
            width:2500,
            height:175,
            bgcolor: '#EEEEEE',
            boxShadow: 1,
            fontWeight: 'bold',
            alignItems: 'center',
            overflow: 'visible',
            borderRadius: '12px'
          }}>
            <div>
              <Typography
              mt = {1}
              color = '#000000'
              fontWeight = 'bold'
              variant = "h5"
              >
                {firstLine}
              </Typography>
            </div>
            <div>
              <Typography
              mt = {2}
              color = '#000000'
              >
                {secondLine}
              </Typography>
            </div>
            <Box pt={2}>
              <Link to = "/login" style ={{textDecoration:'none'}}>
                <Button
                  variant="contained"
                  style = {{minWidth: '400px', backgroundColor: '#009CC4',}}
                  >
                  {thirdLine}
                </Button>
              </Link>
            </Box>
        </Box>
      </Grid>
    );
};
export default ToDo;