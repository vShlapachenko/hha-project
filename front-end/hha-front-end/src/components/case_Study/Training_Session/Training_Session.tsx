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
import './Training_Session.css';

interface CaseStudyAttributes {
    training_image ?: string,
    heading ?: string,
    training_date ?: string,
    training_topic ?: string,
    trainer ?: string, 
    attendees ?: string,
    benefits ?: string,
    story ?: string
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

const Training_Session = ({training_image, heading, training_date, training_topic, trainer, attendees, benefits, story}: CaseStudyAttributes) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <div className={'component'}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar src={training_image}> </Avatar>
                        }
                        title={heading}
                    />

                    <CardMedia
                        component="img"
                        height="194"
                        image={training_image}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">

                            {benefits &&
                                <div className={'benefits'}>
                                    <Chip label={'Benefits: ' + benefits}/>
                                </div>
                            }
                            
                            {trainer && <Chip label={'Trainer: ' + trainer}/>}
                            {training_topic && <Chip label={'Topic: ' + training_topic}/>}
                            
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
                                        {attendees && <Chip sx={{marginLeft: -3, marginRight: 2}} label={'Attendees: ' + attendees}/> }
                                        {training_date && <Chip sx={{marginLeft: -3, marginRight: 2}} label={'Date: ' + training_date}/> }
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
export default Training_Session;