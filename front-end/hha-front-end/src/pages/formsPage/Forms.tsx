import { Button } from "@mui/material";
import React, {FC, useContext, useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Form} from '../../models/forms/Form'
import "./Forms.css";

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

  if(form.label === 'Loading...') {
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
              <h3>{form.tables ? form.label: ''}</h3>
              <Button className='btn' style={{backgroundColor: '#EEEEEE'}}>Option 1</Button>
              <Button className='btn'>{form.tables ? form.tables[0].label : ''}</Button>
              <Button className='btn'>Option 1</Button>
              <Button className='btn'>Option 1</Button>
            </div>
          </div>
          <div className='mainContent'>
            <h1 className='header'>{form.date}</h1>
          </div>
        </div>
      </>
    )
  }
}

export default Forms
