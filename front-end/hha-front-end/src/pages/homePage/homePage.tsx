import styles from "./homePage.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import ToDo from "../../components/TodoList/todo";
import Navbar from "../../components/Navbar/Navbar";
import { useHistory } from "react-router";
import { Trans, useTranslation} from 'react-i18next'

const HomePage = () => {
    let history = useHistory();

    const startForm = () => {history.push("/forms")}
    const createStory = () => {history.push("/caseStudy")}

    const {t, i18n} = useTranslation();

    return(
        <>
        <Navbar />
            <div className={styles.alignment}>
                <h1 className = {styles.textLeaderboard}>
                    <Trans i18nKey= 'Homepage.title'>Leaderboard</Trans>
                </h1>
                <h2 className = {styles.textBest}>
                    <Trans i18nKey='Homepage.best'>Best department of the month</Trans>
                </h2>

                <div>
                    <Leaderboard FirstDepartmentName={"Maternity"} SecondDepartmentName={"Rehab"} ThirdDepartmentName={"Community Health"}
                    FirstPoints={"120" + " points"} SecondPoints={"100" + " points"} ThirdPoints={"80" + " points"} />
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
            </div>
        </>
    );

};

export default HomePage;