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
import { style } from "@mui/system";
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { type } from "os";
import GetAppIcon from '@mui/icons-material/GetApp';
import { Trans, useTranslation } from 'react-i18next';

type FormType = 'fill' | 'display'

interface FormProps {
  type: FormType,
  notChosenBtnStyle: CommonProps["style"],
  chosenBtnStyle: CommonProps["style"],
  formId?: number
  exit(): any
}

type DisplayOption = 'table' | 'chart';

const colorList = [
  '#009cc4',
  '#823b8a',
  '#59b030',
  '#2da67a',
  '#17a19f',
  '#738762',
  '#e57200',
  '#ec8a00',
  '#f2a200',
  '#ffd100'
]

const GeneratedForm = (props: FormProps) => {
  const defaultForm : Form = {label: "Loading...", date: "Loading...", tables: []}
  const [form, setForm] = useState(defaultForm);
  const [currentIndex, setCurrentIndex] = useState<number[]>([0, 0])
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [display, setDisplay] = useState<DisplayOption>('table')

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
      const newForm : Form = props.type == 'fill' ? {...formFromServer, tables: formFromServer.tables.map(t => (
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
          : formFromServer;
      setForm(newForm)
    }

    getForm();
  }, []);

  const fetchData = async () => {
    const res = props.type == 'fill' ? await fetch('http://localhost:5000/form') : await fetch(`http://localhost:5000/submittedForms/${props.formId}`);
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
    else if(props.type === 'fill') {
      var isValid = true
      for(var t of form.tables) {
        for(var st of t.subTables) {
          for(var c of st.columns) {
            for(var i = 0; i < c.cells.length; i++) {
              if((c.cells[i] && !c.cells[i].disabled && c.cells[i].value === undefined)) {
                isValid = false
              }
            }
          }
        }
      }
      if(isValid) {
        setOpenConfirmDialog(true);
      } else {
        setOpenErrorDialog(true);
      }
    } else {
      props.exit();
    }
  }

  const onInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
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
    props.exit();
  }

  const toggleDisplay = (option: DisplayOption) => {
    if(display === option) return;
    setDisplay(option);
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
        <Button onClick={handleClose}><Trans i18nKey='Generate.cancel'>Cancel</Trans></Button>
        <Button onClick={submitForm} autoFocus>
          <Trans i18nKey='Generate.submit'>Submit</Trans>
        </Button>
        <Button><Trans i18nKey='Generate.export'>Export to CSV</Trans></Button>
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
        <Button onClick={handleClose}><Trans i18nKey='Generate.ok'>Ok</Trans></Button>
      </DialogActions>
    </Dialog>
  }

  const showTable = () => (
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
                                    className={`${styles.input} ${props.type === 'display' && !col.cells[cellIndex].disabled ? styles.displayData : ''}`}
                                    value={col.cells[cellIndex].value !== undefined ? col.cells[cellIndex].value?.toString() : ''}
                                    type={col.cells[cellIndex].type}
                                    onChange={(e) => onInputChange(e, colIndex, cellIndex)}
                                    disabled={props.type === 'fill' ? col.cells[cellIndex].disabled : true}
                                    min={0}
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
  )

  const showChart = () => {
    const datasets = form.tables[currentIndex[0]].subTables[currentIndex[1]].columns.map((c, index) => (
        {
          label: c.label,
          data: c.cells.map((c) => {
            if(!c.disabled) {
              return c.value
            }
          }),
          backgroundColor: colorList[index % colorList.length],
        }
    ));

    const data = {
      labels: form.tables[currentIndex[0]].commonColumn.values,
      datasets: datasets,
    }

    return <Bar data={data}/>
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
                <h3>{form.label + ' (Preview)'}</h3>
                {form.tables.map((table, tableIndex) => (
                        table.subTables.map((subTable, stIndex) => {
                          return <Button
                              className={styles.menuBtn}
                              style={(tableIndex === currentIndex[0] && stIndex == currentIndex[1]) ? props.chosenBtnStyle : props.notChosenBtnStyle}
                              onClick={() => setCurrentIndex([tableIndex, stIndex])}
                          >
                            {subTable.label === ''
                                ? table.label
                                : `${table.label} (${subTable.label})`
                            }
                          </Button>
                        })
                    )
                )
                }
              </div>
            </div>
            <div className={styles.mainContentBackgroud}>
              <div className={styles.mainContent}>
                <h2 className={styles.header}>{form.date}</h2>
                {
                  props.type === 'display' ?
                      <div className={styles.btns}>
                        <Button
                            className={styles.tabBtn}
                            style={display === 'table' ? props.chosenBtnStyle : props.notChosenBtnStyle}
                            onClick={() => toggleDisplay('table')}
                        >
                          Table
                        </Button>
                        <Button
                            className={styles.tabBtn}
                            style={display === 'chart' ? props.chosenBtnStyle : props.notChosenBtnStyle}
                            onClick={() => toggleDisplay('chart')}
                        >
                          Chart
                        </Button>
                      </div>
                      : <></>
                }
                {
                  display === 'table'
                      ? showTable()
                      : showChart()
                }
                <div className={styles.btns}>
                  <Button>{props.type === 'fill' ? 'Save as Draft' : 'Export as CSV'}</Button>
                  {
                    currentIndex[0] === 0 && currentIndex[1] === 0
                        ? null
                        : <Button
                            className={styles.btn}
                            onClick={moveBack}
                        >
                          {props.type === 'fill' ? 'Move to the Previous Step' : 'Back' }
                        </Button>
                  }
                  <Button
                      className={styles.btn}
                      onClick={proceedToNext}
                  >{(currentIndex[0] === form.tables.length - 1 && currentIndex[1] === form.tables[currentIndex[0]].subTables.length - 1)
                      ? props.type === 'fill' ? 'Preview' : 'Exit'
                      : props.type === 'fill' ? 'Proceed to Next Step' : 'Next'}
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

export default GeneratedForm
