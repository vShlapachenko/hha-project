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
import Navbar from '../../Navbar/Navbar';


interface CaseStudyAttributes {
    equipment_image?: string,
    heading?: string,
    equipment_received?: string,
    department?: string,
    equipment_from?: string,
    donated_or_purchased?: string,
    equipment_use?: string,
    story?: string
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const Equipment_Received = ({equipment_image, heading, equipment_received, department, equipment_from, donated_or_purchased, equipment_use, story}: CaseStudyAttributes) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Navbar />
            <div className={'component'}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar src={equipment_image}> </Avatar>
                        }
                        title={heading}
                    />

                    <CardMedia
                        component="img"
                        height="194"
                        image={equipment_image}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">

                            <div className={'employeeStory'}>
                                {equipment_use && <Chip label={'Equipment Use: ' + equipment_use}/>}
                            </div>
                            
                            {equipment_received && <Chip label={'Equipment: ' + equipment_received}/>}
                            {equipment_from && <Chip label={'Equipment From: ' + equipment_from}/>}
                            
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <div className={'expand'}>
                            <h3>Click on this arrow to learn more</h3>
                        </div>
                        
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>

                        <CardContent>
                            <div className={'moreInfo'}>
                                <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                        {department && <Chip sx={{marginLeft: -3, marginRight: 2}} label={'Department: ' + department}/>} 
                                        {donated_or_purchased && <Chip sx={{marginLeft: -3, marginTop: 2}} label={donated_or_purchased}/>}
                                        </Typography>
                                </CardContent>
                            </div>
                            
                                <Typography paragraph>
                                    <div className={'story'}>
                                        {story}
                                    </div>
                                </Typography>
                            
                            
                        </CardContent>

                    </Collapse>

                </Card>
            </div>
        </div>
    );
}
export default Equipment_Received;