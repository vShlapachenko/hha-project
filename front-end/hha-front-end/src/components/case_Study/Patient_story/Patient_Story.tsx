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
import Navbar from "../../Navbar/Navbar";
import styles from './Patient_Story.module.css'
import Button from '@mui/material/Button';


interface CaseStudyAttributes {
    patient_image ?: string,
    case_image ?: string,
    heading ?: string,
    patient_name ?: any,
    patient_age ?: any,
    patient_location ?: any,
    reason_hcbh ?: any, 
    duration_hcbh ?: any,
    diagnosis ?: any,
    story ?:any,
    employee_story ?: any
    onChangeFunc: any

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

const Patient_Story = ({patient_image, case_image, heading, patient_name = '', patient_age= '', patient_location= '',
    reason_hcbh, duration_hcbh,  diagnosis= '', story, employee_story, onChangeFunc}: CaseStudyAttributes) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <div className={styles.component}>
                {/* <Card sx={{ maxWidth: 345}}> */}
                <Card sx={{width:700}} >
                <Button className={styles.exitButton} onClick={()=>onChangeFunc()}>X</Button>
                    <CardHeader className={styles.title}
                        avatar={
                            patient_image?<Avatar src={patient_image}> </Avatar>:<></>
                        }
                        title={heading}
                    />
                    
                    <CardMedia
                        component="img"
                        image={case_image}
                    />

                    <CardContent>
                        <Typography variant="body2" >

                            {employee_story && 
                                <div className={styles.employeeStory}>
                                    {employee_story}
                                </div>
                            }
                             {
                                patient_name&& <div>
                                <h2>{patient_name.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                <p>{patient_name.answer}</p></div>
                             }
                            {/* {patient_name && <Chip label={patient_name.question} + {patient_name.answer}/> }
                            
                            {patient_age && <Chip label={'Patient`s Age: ' + patient_age}/> } */}
                            {
                                patient_age&& <div><h2>{patient_age.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                <p>{patient_age.answer}</p></div>
                            }
                           
                            
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <div className={styles.expand}>
                            <h3>Click arrow on the right to learn more</h3>
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
                            <div className={styles.moreInfo}>
                                <CardContent>
                                        <Typography variant="body2">
                                        {/* {patient_location && <Chip sx={{marginLeft: -3, marginRight: 2}} label={'Patient`s Location: ' + patient_location}/> } */}
                                        {patient_location&&<div>
                                        <h2>{patient_location.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                        <p>{patient_location.answer}</p></div>
                                        }   

                                        {reason_hcbh&&<div>
                                        <h2>{reason_hcbh.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                        <p>{reason_hcbh.answer}</p></div>
                                        }   
                                        {/* {reason_hcbh && <Chip label={'Reason: ' + reason_hcbh}/> } */}

                                        {duration_hcbh&&<div>
                                        <h2>{duration_hcbh.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                        <p>{duration_hcbh.answer}</p></div>
                                        }   
                                        {/* {duration_hcbh && <Chip sx={{marginLeft: -3, marginTop: 2}} label={'Duration at HCBH: ' + duration_hcbh}/> } */}
                                        {diagnosis&&<div>
                                        <h2>{diagnosis.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                        <p>{diagnosis.answer}</p></div>
                                        }  
                                        {/* {diagnosis && <Chip sx={{marginLeft: -3, marginTop: 2}} label={'Patient`s Diagnosis: ' + diagnosis}/> }  */}
                                        </Typography>
                                </CardContent>
                            </div>
                            
                                <Typography paragraph>
                                    <div className={styles.story}>
                                        {story&&<div>
                                        <h2>{story.question.replace(/[\?\"\(\)]/g, "")}</h2>
                                        <p>{story.answer}</p></div>
                                        } 
                                    </div>
                                </Typography>
                            
                            
                        </CardContent>

                    </Collapse>

                </Card>
            </div>
        </div>
    );
}
export default Patient_Story;