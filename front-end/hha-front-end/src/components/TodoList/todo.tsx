import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import styles from './todo.module.css'
import { types } from '@babel/core';


interface ToDoAttribute{
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    func: () => void;
}

const ToDo = ({firstLine, secondLine, thirdLine, func}:ToDoAttribute) => {

    return(
      <div className ={styles.toDogrid}>
        <div className = {styles.toDobox}>

            <h2 className = {styles.toDoh2}>
              {firstLine}
            </h2>

            <p className={styles.p}>
              {secondLine}
            </p>

            <Box pt={2}>
              <button className = {styles.todoButton} onClick = {func}>
                  {thirdLine}
              </button>
            </Box>
        </div>
      </div>
    );
};
export default ToDo;
