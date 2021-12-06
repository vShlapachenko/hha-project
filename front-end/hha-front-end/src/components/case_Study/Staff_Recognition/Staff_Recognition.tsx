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
import './Staff_Recognition.css'


interface CaseStudyAttributes {
    staff_image?: string,
    name?: string,
    heading?: string,
    job_title?: string,
    department?: string,
    duration_hcbh?: string,
    enjoy_the_most?: string,
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

const Staff_Recognition = ({staff_image, name, heading, job_title, department, duration_hcbh, enjoy_the_most, story}: CaseStudyAttributes) => {
    
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
                            <Avatar src={staff_image}> </Avatar>
                        }
                        title={heading}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={staff_image}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            
                            {name && <Chip label={'Name: ' + name}/>}

                            {enjoy_the_most && 
                                <div className={'enjoy_the_most'}>
                                    <Chip label={'Enjoy`s: ' + enjoy_the_most}/>
                                </div>
                            }                      
                                                        
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

                                <Chip label={'Job Title: ' + job_title}/>
                                <Chip label={'department: ' + department}/>
                                <Chip label={'Duration at HCBH: ' + duration_hcbh}/>       
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
export default Staff_Recognition;