import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import './todo.css'


interface ToDoAttribute{
    firstLine: string;
    secondLine: string;
    thirdLine: string;
}

const ToDo = ({firstLine, secondLine, thirdLine}:ToDoAttribute) => {

    return(
      <div className = "grid">
        <div className = "box">

            <h2>
              {firstLine}
            </h2>

            <p>
              {secondLine}
            </p>

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
        </div>
      </div>
    );
};
export default ToDo;