import { observer } from "mobx-react-lite";
import "./homePage.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import ToDo from "../../components/TodoList/todo";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
    return(
        <>
        <Navbar />
        <h1 className = "textLeaderboard">
            Leaderboard
        </h1>
        <h2 className = "textBest">
            Best department of the month
        </h2>

        <div>
            <Leaderboard FirstDepartmentName={"Maternity"} SecondDepartmentName={"Rehab"} ThirdDepartmentName={"Community Health"} 
            FirstPoints={"120" + " points"} SecondPoints={"100" + " points"} ThirdPoints={"80" + " points"} />
        </div>
                    
        <h1 className = "textTODO">
            What's TODO List
        </h1>
        
        <div>
            <ToDo firstLine = {"Form for Sep, 2021 is ready to fill in."} 
            secondLine = {"Click on the button to start filling in the form for Sep, 2021 or go to Forms Tab to start the form."}
            thirdLine = {"Start the form"}/>
        </div> 

        <div>
            <ToDo firstLine = {"Create New Story"}
            secondLine = {"Click on the button to create a new story or go to Case Study Tab"}
            thirdLine = {"Create New Story"}/>
        </div>
        </>
    );

};

export default HomePage;