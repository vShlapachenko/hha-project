import React, {useState} from 'react';
import styles from './Leaderboard.module.css';
import {Trans, useTranslation} from 'react-i18next'

interface LeaderboardAttribute {
    FirstDepartmentName: string;
    SecondDepartmentName: string;
    ThirdDepartmentName: string;
    FirstPoints: string;
    SecondPoints: string;
    ThirdPoints: string;
}

const Leaderboard = ({FirstDepartmentName, SecondDepartmentName, ThirdDepartmentName, FirstPoints, SecondPoints, ThirdPoints}:LeaderboardAttribute) => {

  const {t, i18n} = useTranslation();

  return (
      <div className = {styles.grid}>
         <div className = {`${styles.box} ${styles.second}`}>
          
          <h3>
            <Trans i18nKey='Homepage.second'>2nd place</Trans>
          </h3>

          <h1>
            {SecondDepartmentName}
          </h1>

          <h2>
            {SecondPoints}
          </h2>
        </div>
        
        <div className = {`${styles.box} ${styles.first}`}>

          <h3>
            <Trans i18nKey = 'Homepage.first'>1st place</Trans>
          </h3>

          <h1>
            {FirstDepartmentName}
          </h1>

          <h2>
            {FirstPoints}
          </h2>

        </div>
        <div className = {`${styles.box} ${styles.third}`}>
          
          <h3>
            <Trans i18nKey = 'Homepage.third'>3rd place</Trans>
          </h3>

          <h1>
            {ThirdDepartmentName}
          </h1>

          <h2>
            {ThirdPoints}
          </h2>
            
        </div>
       </div>
    );
};

export default Leaderboard;