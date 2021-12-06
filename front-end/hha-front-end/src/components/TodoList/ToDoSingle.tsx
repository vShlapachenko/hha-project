import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import styles from './ToDoSingle.module.css'
import { types } from '@babel/core';


interface ToDoAttribute{
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    func: () => void;
}

const ToDoSingle = ({firstLine, secondLine, thirdLine, func}:ToDoAttribute) => {

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
              <Button sx={{ background: '#009CC4'}}
                      variant="contained" className = {styles.todoButton} onClick = {func}>
                  {thirdLine}
              </Button>
            </Box>
        </div>
      </div>
    );
};
export default ToDoSingle;
