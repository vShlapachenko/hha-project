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
import { Column } from "../../models/forms/Column";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const defaultForm : Form = {label: "Loading...", date: "Loading...", tables: []}
  const [form, setForm] = useState(defaultForm);
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenConfirmDialog(true);
  };

  const handleClose = () => {
    setOpenConfirmDialog(false);
    setOpenErrorDialog(false);
  };

  useEffect(() => {
    const getForm = async () => {
      const formFromServer : Form = await fetchData()
      const newForm : Form = {...formFromServer, tables: formFromServer.tables.map(t => (
        {...t, columns: t.columns.map(c => ({...c, cells: new Array(t.commonColumn.values.length)}))}
      ))}
      setForm(newForm)
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
    } else {
      var isValid = true
      for(var t of form.tables) {
        for(var c of t.columns) {
          for(var i = 0; i < c.cells.length; i++) {
            if(!c.cells[i]) {
              isValid = false
            }
          }
        }
      }
      if(isValid) {
        setOpenConfirmDialog(true)
      } else {
        setOpenErrorDialog(true)
      }
    }
  }

  const onInputChange = (
      e: React.ChangeEvent<HTMLInputElement>, 
      col: Column, 
      colIndex: number,
      cellIndex: number
    ) => {
      form.tables[currentIndex].columns[colIndex].cells[cellIndex] = Number(e.target.value)
      setForm({...form})
  }

  const submitForm = async () => {
    const res = await fetch('http://localhost:5000/submittedForms', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    setOpenConfirmDialog(false)
  }

  const showConfirmDialog = () => {
    return <Dialog
      open={openConfirmDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Submit the form?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`You are going to submit the form for ${form.label} department. Click on 'Submit' to proceed.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submitForm} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  }

  const showErrorDialog = () => {
    return <Dialog
      open={openErrorDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Submission Falied!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Some of the fields are not filled. Please insure that all fields are filled before the submission.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  }

  if(form.tables.length === 0) {
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
              {form.tables.map((table, index) => {
                    return <Button 
                      className='btn'
                      style={index !== currentIndex ? chosenBtnStyle : notChosenBtnStyle}
                      onClick={() => setCurrentIndex(index)}
                      >
                        {table.label}
                    </Button>
                })
              }
            </div>
          </div>
          <div className='mainContent'>
            <h2 className='header'>{form.date}</h2>
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
                    form.tables[currentIndex].commonColumn.values.map((label, cellIndex) => (
                      <TableRow
                        key={label}
                        // sx={{ '&:nth-child(n) td, &:nth-child(n) th': { border: '1px solid #009CC4' } }}
                      >
                        <TableCell component='th' scope='row'>
                          {label}
                        </TableCell>
                        {
                          form.tables[currentIndex].columns.map((col, colIndex) => (
                            <TableCell>
                              <input 
                                value={col.cells[cellIndex] ? col.cells[cellIndex] : ''} 
                                type='number' 
                                onChange={(e) => onInputChange(e, col, colIndex, cellIndex)}
                              />
                            </TableCell>
                          ))
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
                >{currentIndex === form.tables.length - 1 ? 'Submit' : 'Proceed to Next Step'}</Button>
            </div>
          </div>
        </div>
        {showConfirmDialog()}
        {showErrorDialog()}
      </>
    )
  }
}

export default Forms
