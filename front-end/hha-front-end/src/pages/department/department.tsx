import React from "react";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Navbar from '.../components/Navbar/Navbar';


interface departmentAttributes {
    name ?: string;
}

const department = ({name}: departmentAttributes) => {
    
    return (
        <div>
            {/* <Navbar /> */}
            
        </div>
    );
}
export default department;