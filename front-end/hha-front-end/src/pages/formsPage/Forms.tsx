import { Button } from "@mui/material";
import React, {FC, useContext, useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Form} from '../../models/forms/Form'
import styles from "./Forms.module.css";
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
import { useTranslation,Trans } from "react-i18next";

const notChosenBtnStyle : CommonProps["style"] = {
  backgroundColor: '#EEEEEE',
  color: 'black',
  marginTop: '8px',
}

const chosenBtnStyle = {
  backgroundColor: '#009CC4',
  color: 'white',
  marginTop: '8px'
}

const Forms: FC = () => {
  const defaultForm : Form = {label: "Loading...", date: "Loading...", tables: []}
  const [form, setForm] = useState(defaultForm);
  const [currentIndex, setCurrentIndex] = useState<number[]>([0, 0])
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const {t, i18n} = useTranslation();

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
        {...t, subTables: t.subTables.map(st => (
          {...st, columns: st.columns.map(c => (
            {...c, cells: !c.cells || c.cells.length === 0 ? t.commonColumn.values.map((cc) => (
              {
                disabled: false,
                value: undefined,
                type: 'number'
              }
            ))
          : c.cells
        }))}
        ))}
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

  const moveBack = () => {
    if(currentIndex[1] === 0) {
      setCurrentIndex([currentIndex[0] - 1, form.tables[currentIndex[0] - 1].subTables.length - 1])
    } else {
      setCurrentIndex([currentIndex[0], currentIndex[1] - 1])
    }
  }

  const proceedToNext = () => {
    if(form.tables && currentIndex[1] < form.tables[currentIndex[0]].subTables.length - 1) {
      setCurrentIndex([currentIndex[0], currentIndex[1] + 1])
    } else if(form.tables && currentIndex[0] < form.tables.length - 1) {
      setCurrentIndex([currentIndex[0] + 1, 0])
    }
     else {
      var isValid = true
      for(var t of form.tables) {
        for(var st of t.subTables) {
          for(var c of st.columns) {
            for(var i = 0; i < c.cells.length; i++) {
              if((c.cells[i] && !c.cells[i].disabled && !c.cells[i].value)) {
                isValid = false
              }
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
      form.tables[currentIndex[0]].subTables[currentIndex[1]].columns[colIndex].cells[cellIndex].value = Number(e.target.value)
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
        {t("Form.alert")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`You are going to submit the form for ${form.label} department. Click on 'Submit' to proceed.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submitForm} autoFocus>
          <Trans i18nKey='Form.submit'>Submit</Trans>
        </Button>
        <Button>
          <Trans i18nKey='Form.export'>Export to CSV</Trans>
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
        {t('Form.failed')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Trans i18nKey='Form.some'>Some of the fields are not filled. Please insure that all fields are filled before the submission.</Trans>
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
      <h1 className={styles.header}>{form.date}</h1>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.sideMenuBackground}>
            <div className={styles.sideMenu}>
              <h3>{form.label}</h3>
              {form.tables.map((table, tableIndex) => (
                table.subTables.map((subTable, stIndex) => {
                  return <Button 
                    className={styles.menuBtn}
                    style={(tableIndex === currentIndex[0] && stIndex == currentIndex[1]) ? chosenBtnStyle : notChosenBtnStyle}
                    onClick={() => setCurrentIndex([tableIndex, stIndex])}
                    >
                      {subTable.label === '' 
                        ? table.label
                        : `${table.label} (${subTable.label})`
                      }
                  </Button>
              }))
              )
              }
            </div>
          </div>
          <div className={styles.mainContentBackgroud}>
            <div className={styles.mainContent}>
              <h2 className={styles.header}>{form.date}</h2>
              <TableContainer>
                <h4 className={styles.test}>
                    {form.tables[currentIndex[0]].subTables[currentIndex[1]].label === '' 
                        ? form.tables[currentIndex[0]].label
                        : `${form.tables[currentIndex[0]].label} (${form.tables[currentIndex[0]].subTables[currentIndex[1]].label})`
                      }</h4>
                <Table className={styles.table} area-aria-label='simple table' style={{backgroundColor: '#EEEEEE'}}>
                  <TableHead>
                    <TableRow className={styles.tableRow}>
                      <TableCell>{form.tables[currentIndex[0]].commonColumn.label}</TableCell>
                      {form.tables[currentIndex[0]].subTables[currentIndex[1]].columns.map((column) => (
                        <TableCell align="center">{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      form.tables[currentIndex[0]].commonColumn.values.map((label, cellIndex) => (
                        <TableRow
                          key={label}
                          className={styles.tableRow}
                        >
                          <TableCell className={styles.table} component='th' scope='row'>
                            {label}
                          </TableCell>
                          {
                            form.tables[currentIndex[0]].subTables[currentIndex[1]].columns.map((col, colIndex) => (
                              col.cells[cellIndex] && col.cells[cellIndex].type ?
                              <TableCell align="center">
                                <input
                                  className={styles.input} 
                                  value={col.cells[cellIndex].value ? col.cells[cellIndex].value : ''} 
                                  type={col.cells[cellIndex].type}
                                  onChange={(e) => onInputChange(e, col, colIndex, cellIndex)}
                                  disabled={col.cells[cellIndex].disabled}
                                />
                              </TableCell>
                              : null
                            ))
                          }
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={styles.btns}>
                <Button><Trans i18nKey='Form.save'>Save as Draft</Trans></Button>
                {
                  currentIndex[0] === 0 && currentIndex[1] === 0
                    ? null
                    : <Button 
                    className={styles.btn}
                    onClick={moveBack}
                    >
                      <Trans i18nKey='Form.prev'>Move to the Previous Step</Trans>
                    </Button>
                }
                <Button 
                  className={styles.btn}
                  onClick={proceedToNext}
                  >{(currentIndex[0] === form.tables.length - 1 && currentIndex[1] === form.tables[currentIndex[0]].subTables.length - 1)
                    ? 'Preview' 
                    : 'Proceed to Next Step'}
                  </Button>
              </div>
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
