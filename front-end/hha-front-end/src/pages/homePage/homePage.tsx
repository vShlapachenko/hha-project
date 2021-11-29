import styles from "./homePage.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import ToDoSingle from "../../components/TodoList/ToDoSingle";
import Navbar from "../../components/Navbar/Navbar";
import {useHistory} from "react-router";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import Todo from "../../components/TodoList/Todo";
import $api from "../../http";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    $api.get("/todo")
      .then((res) => {
        setTodoData(res.data)
      })
  }, [todoData])
  return (
    <>
      <Navbar/>
      <h1 className={styles.textLeaderboard}>
        Leaderboard
      </h1>
      <h2 className={styles.textBest}>
        Best department of the month
      </h2>

      <div>
        <Leaderboard FirstDepartmentName={"Maternity"} SecondDepartmentName={"Rehab"}
                     ThirdDepartmentName={"Community Health"}
                     FirstPoints={"120" + " points"} SecondPoints={"100" + " points"} ThirdPoints={"80" + " points"}/>
      </div>

      {
        (() => {
          console.log(todoData)
          if (todoData)
            return <Todo/>
        })
      }

    </>
  );

};

export default HomePage;