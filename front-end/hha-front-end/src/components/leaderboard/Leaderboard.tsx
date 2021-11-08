import React, {useState} from 'react';
import './Leaderboard.css';

interface LeaderboardAttribute {
    FirstDepartmentName: string;
    SecondDepartmentName: string;
    ThirdDepartmentName: string;
    FirstPoints: string;
    SecondPoints: string;
    ThirdPoints: string;
}

const Leaderboard = ({FirstDepartmentName, SecondDepartmentName, ThirdDepartmentName, FirstPoints, SecondPoints, ThirdPoints}:LeaderboardAttribute) => {
    return (
      <div className = 'grid'>
         <div className = 'box second'>
          
          <h3>
            2nd place
          </h3>

          <h1>
            {SecondDepartmentName}
          </h1>

          <h2>
            {SecondPoints}
          </h2>
        </div>
        
        <div className = 'box first'>

          <h3>
            1st place
          </h3>

          <h1>
            {FirstDepartmentName}
          </h1>

          <h2>
            {FirstPoints}
          </h2>

        </div>
        <div className = 'box third'>
          
          <h3>
            3rd place
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