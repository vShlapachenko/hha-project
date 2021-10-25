import { Button } from "@mui/material";
import React, {FC, useContext, useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Form} from '../../models/forms/Form'
import "./Forms.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CommonProps } from "@mui/material/OverridableComponent";

const chosenBtnStyle : CommonProps["style"] = {
  backgroundColor: '#EEEEEE',
  color: 'black',
  marginTop: '8px'
}

const notChosenBtnStyle = {
  backgroundColor: '#009CC4',
  color: 'white',
  marginTop: '8px'
}

const Forms: FC = () => {
  const defaultForm : Form = {label: "Loading...", date: "Loading..."}
  const [form, setForm] = useState<Form>(defaultForm);
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const getForm = async () => {
      const formFromServer = await fetchData()
      setForm(formFromServer)
    }

    getForm();
  }, [])

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/form');
    const newForm = await res.json();
    return newForm;
  }

  const proceedToNext = () => {
    if(form.tables && currentIndex < form.tables?.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if(!form.tables) {
    return(
      <>
      <Navbar />
      <h1 className='header'>{form.date}</h1>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className='container'>
          <div className='sideMenuBackground'>
            <div className='sideMenu'>
              <h3>{form.label}</h3>
              {form.tables ? form.tables.map((table, index) => {
                    return <Button 
                      className='btn'
                      style={index !== currentIndex ? chosenBtnStyle : notChosenBtnStyle}
                      onClick={() => setCurrentIndex(index)}
                      >
                        {table.label}
                    </Button>
                })
                : <> </>
              }
            </div>
          </div>
          <div className='mainContent'>
            <h1 className='header'>{form.date}</h1>
            <TableContainer component={Paper}>
              <Table area-aria-label='simple table' style={{backgroundColor: '#EEEEEE'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>{form.tables[currentIndex].commonColumn.label}</TableCell>
                    {form.tables[currentIndex].columns.map((column) => (
                      <TableCell>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    form.tables[currentIndex].commonColumn.values.map((label) => (
                      <TableRow
                        key={label}
                        // sx={{ '&:nth-child(n) td, &:nth-child(n) th': { border: '1px solid #009CC4' } }}
                      >
                        <TableCell component='th' scope='row'>
                          {label}
                        </TableCell>
                        {
                          form.tables ? form.tables[currentIndex].columns.map(() => (
                            <TableCell><input type='number'/></TableCell>
                          ))
                          : <></>
                        }
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <div className='btns'>
              <Button>Save as Draft</Button>
              <Button 
                style={notChosenBtnStyle}
                onClick={proceedToNext}
                >Proceed to next Step</Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Forms
