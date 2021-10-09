import React from 'react';
import Leaderboard from 'react-leaderboard';

this.state = {
    data: [
        {DepartmentName: "", Score: 0} //retrieve from backend
    ],
}

render(){
    return (
        <Leaderboard
        data = {this.state.data}
        sortBy = 'highScore'
        labelBy = 'DepartmentName'/>
    )
}