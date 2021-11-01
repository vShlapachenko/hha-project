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
      <div className = "toDogrid">
        <div className = "toDobox">

            <h2 className = "toDoh2">
              {firstLine}
            </h2>

            <p>
              {secondLine}
            </p>

            <Box pt={2}>
              <Link to = "/login" style ={{textDecoration:'none'}}>
                <button className = "todoButton">
                  {thirdLine}
                </button>
              </Link>
            </Box>
        </div>
      </div>
    );
};
export default ToDo;
