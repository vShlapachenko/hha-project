import React, {useState} from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography';
import './Leaderboard.module.css';

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
      <div className='grid'>
        <h1 className='grid'>hi</h1>
      </div>
//       <div className = 'grid'>
//          <div className = 'box'>
          
//           {/* <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               2nd Place
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               variant = "h4"
//               my = {1}
//               align = "center"  
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {SecondDepartmentName}
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {SecondPoints} points
//             </Typography> */}
//           {/* </div> */}
//             <h1>hello</h1>
//         </div>

//         {/* <div className = 'box'>
          
//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               2nd Place
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               variant = "h4"
//               my = {1}
//               align = "center"  
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {SecondDepartmentName}
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {SecondPoints} points
//             </Typography>
//           </div>

//         </div> */}
        
        
// {/* 
//         <Box
//           sx={{
//             width:300,
//             height: 150,
//             bgcolor: '#823B8A',
//             boxShadow: 1,
//             overflow: 'hidden',
//             borderRadius: '12px'
//           }}> 
          
//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               1st Place
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               variant = "h4"
//               my = {1}
//               align = "center"  
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {FirstDepartmentName}
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//               color = "#FFFFFF"
//             >
//               {FirstPoints} points
//             </Typography>
//           </div>
//         </Box>

//         <Box
//           sx={{
//             width:300,
//             height: 150,
//             bgcolor: '#EEEEEE',
//             boxShadow: 1,
//             overflow: 'hidden',
//             borderRadius: '12px'
//           }}> 
          
//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//             >
//               3rd Place
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               variant = "h4"
//               my = {1}
//               align = "center"  
//               fontWeight = "bold"
//             >
//               {ThirdDepartmentName}
//             </Typography>
//           </div>

//           <div>
//             <Typography
//               mt = {2}
//               align = "center"
//               fontWeight = "bold"
//             >
//               {ThirdPoints} points
//             </Typography>
//           </div>
//         </Box> */}
//         </div>
    );
};

export default Leaderboard;