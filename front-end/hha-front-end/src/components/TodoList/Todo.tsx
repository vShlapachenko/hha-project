import React from 'react';
import styles from "./Todo.module.css";
import ToDoSingle from "./ToDoSingle";
import {useHistory} from "react-router";
import {Trans, useTranslation} from 'react-i18next';

function Todo(props: any) {
  let history = useHistory();

  const startForm = () => {
    history.push("/forms")
  }
  const createStory = () => {
    history.push("/caseStudy")
  }

  const {i18n, t} = useTranslation();

  if (props.todoData.shouldBeSeen) {
    return (<div>
      <h1 className={styles.textTODO}>
        What's TODO List
      </h1>

      <div>
        <ToDoSingle firstLine={t('Todo.form')}
                    secondLine={t('Todo.click')}
                    thirdLine={t('Todo.start')}
                    func={startForm}/>
      </div>

      <div>
        <ToDoSingle firstLine={t('Todo.create')}
                    secondLine={t('Todo.button')}
                    thirdLine={t('Todo.new')}
                    func={createStory}/>
      </div>
    </div>)
  }
  return (
    <h1 className={styles.textTODO}>
      <Trans i18nKey='Todo.caught'>You are all caught Up! Great!</Trans>
    </h1>
  );
}

export default Todo;