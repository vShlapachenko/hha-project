import styles from "./homePage.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import ToDo from "../../components/TodoList/todo";
import Navbar from "../../components/Navbar/Navbar";
import { useHistory } from "react-router";
import { Trans, useTranslation} from 'react-i18next'
import {useContext} from "react";
import {Context} from "../../index";
import $api from "../../http";
import { Points } from "../../models/homepage/Points"
import { useEffect, useState } from "react";


const HomePage = () => {
    let history = useHistory();

    const startForm = () => {history.push("/forms")}
    const createStory = () => {history.push("/caseStudy")}

    const {t, i18n} = useTranslation();
    const [points, setPoints] = useState<Points[]>([])
    const [check, setCheck] = useState<Boolean>()

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
                    
        <h1 className = {styles.textTODO}>
            <Trans i18nKey='Homepage.todo'>What's TODO List</Trans>
        </h1>
        
        <div>
            <ToDo firstLine = {"Form for Sep, 2021 is ready to fill in."} 
            secondLine = {"Click on the button to start filling in the form for Sep, 2021 or go to Forms Tab to start the form."}
            thirdLine = {"Start the form"}
            func = {startForm}/>
        </div> 

        <div>
            <ToDo firstLine = {"Create New Story"}
            secondLine = {"Click on the button to create a new story or go to Case Study Tab"}
            thirdLine = {"Create New Story"}
            func = {createStory}/>
        </div>
        </>
    );

};

export default HomePage;