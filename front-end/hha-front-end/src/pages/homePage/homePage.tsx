import styles from "./homePage.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import ToDo from "../../components/TodoList/ToDoSingle";
import Navbar from "../../components/Navbar/Navbar";
import { useHistory } from "react-router";
import { Trans, useTranslation} from 'react-i18next'
import {useContext} from "react";
import {Context} from "../../index";
import $api from "../../http";
import { Points } from "../../models/homepage/Points"
import { useEffect, useState } from "react";
import ToDoSingle from "../../components/TodoList/ToDoSingle";
import Todo from "../../components/TodoList/Todo";



const HomePage = () => {
    let history = useHistory();

    const startForm = () => {history.push("/forms")}
    const createStory = () => {history.push("/caseStudy")}

    const {t, i18n} = useTranslation();
    const [points, setPoints] = useState<Points[]>([])
    const [check, setCheck] = useState<Boolean>()

    const [todoData, setTodoData] = useState([]);

    useEffect(() => {
      $api.get("/todo")
        .then((res) => {
          setTodoData(res.data)
        })
    }, [])

    useEffect(() => {
        $api.get<Points[]>('/leaderboard/monthDepartments').then((r) => {
            console.log(r.data)
            setPoints(r.data)
            setCheck(true)
        });
    }, []);

    return(
        <>
        <Navbar />
        <h1 className = {styles.textLeaderboard}>
            <Trans i18nKey= 'Homepage.title'>Leaderboard</Trans>
        </h1>
        <h2 className = {styles.textBest}>
            <Trans i18nKey='Homepage.best'>Best department of the month</Trans>
        </h2>
        <div>
            {check ?
            <Leaderboard FirstDepartmentName={points[0].depName} SecondDepartmentName={points[1].depName} ThirdDepartmentName={points[2].depName}
            FirstPoints={points[0].depPoint + " points"} SecondPoints={points[1].depPoint + " points"} ThirdPoints={points[2].depPoint + " points"} />:
            <h2 className = {styles.textBest}>Loading...</h2>
            }
        </div>
        
        <Todo todoData={todoData}/>
        </>
    );

};

export default HomePage;