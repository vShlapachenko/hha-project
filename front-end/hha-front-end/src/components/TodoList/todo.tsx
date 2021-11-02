import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import './todo.css'
import { types } from '@babel/core';


interface ToDoAttribute{
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    func: () => void;
}

const ToDo = ({firstLine, secondLine, thirdLine, func}:ToDoAttribute) => {

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
              <button className = "todoButton" onClick = {func}>
                  {thirdLine}
              </button>
            </Box>
        </div>
      </div>
    );
};
export default ToDo;
