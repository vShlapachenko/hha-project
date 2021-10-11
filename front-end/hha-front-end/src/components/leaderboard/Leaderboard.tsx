import React from 'react';
import Leaderboard from 'react-leaderboard';

//using https://github.com/CGally/react-leaderboard library

interface LeaderboardAttributes {
    DepartmentName: string;
}

const Leaderboard = ({DepartmentName}: LeaderboardAttributes) => {

    return (
        <div>
            <Leaderboard users={DepartmentName}></Leaderboard>
        </div>
    );

};

export default Leaderboard;