import React from 'react';
import styles from "./Todo.module.css";
import ToDoSingle from "./ToDoSingle";
import {useHistory} from "react-router";

function Todo(props: any) {
  let history = useHistory();

  const startForm = () => {
    history.push("/forms")
  }
  const createStory = () => {
    history.push("/caseStudy")
  }


  if (props.todoData.shouldBeSeen) {
    return (<div>
      <h1 className={styles.textTODO}>
        What's TODO List
      </h1>

      <div>
        <ToDoSingle firstLine={"Form for Sep, 2021 is ready to fill in."}
                    secondLine={"Click on the button to start filling in the form for Sep, 2021 or go to Forms Tab to start the form."}
                    thirdLine={"Start the form"}
                    func={startForm}/>
      </div>

      <div>
        <ToDoSingle firstLine={"Create New Story"}
                    secondLine={"Click on the button to create a new story or go to Case Study Tab"}
                    thirdLine={"Create New Story"}
                    func={createStory}/>
      </div>
    </div>)
  }
  return (
    <h1 className={styles.textTODO}>
      You are all caught Up! Great!
    </h1>
  );
}

export default Todo;