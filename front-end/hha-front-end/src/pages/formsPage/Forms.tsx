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
import GeneratedForm from '../../components/form/GeneratedForm'
import { Trans, useTranslation } from 'react-i18next'

const notChosenBtnStyle: CommonProps["style"] = {
  backgroundColor: '#EEEEEE',
  color: 'black',
  marginTop: '8px',
}

const chosenBtnStyle: CommonProps["style"] = {
  backgroundColor: '#009CC4',
  color: 'white',
  marginTop: '8px'
}

type FormOption = 'fill' | 'display'

const Forms: FC = () => {
  const [option, setOption] = useState<FormOption>()

  const {t,i18n} = useTranslation();

  const exit = () => {
    setOption(undefined)
  }

  if(!option) {
    return (
      <>
      <Navbar/>
        <Button
          style={chosenBtnStyle}
          onClick={() => setOption('fill')}
        >
          <Trans i18nKey = 'Form.fill'>Fill The Form</Trans>
        </Button>
        <Button
          style={notChosenBtnStyle}
          onClick={() => setOption('display')}
        >
          <Trans i18nKey = 'Form.display'>Display The Form</Trans>
        </Button>
      </>
    );
  } else {
    return (
      <GeneratedForm
        type={option}
        chosenBtnStyle={chosenBtnStyle}
        notChosenBtnStyle={notChosenBtnStyle}
        formId={2}
        exit={exit}
      />
    )
  }
  
}

export default Forms
