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
import styles from './case_Study.module.css'


interface CaseStudyAttributes {
    patient_image?: string,
    case_image: string,
    heading: string,
    patient_name ?: string,
    patient_age ?: string,
    patient_location?: string,
    reason_hcbh: string, 
    duration_hcbh: string,
    diagnosis?: string,
    story:string,
    employee_story: string

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
    reason_hcbh, duration_hcbh,  diagnosis= '', story, employee_story}: CaseStudyAttributes) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Navbar />
            <div className={styles.component}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar src={patient_image}> </Avatar>
                        }
                        title={heading}
                    />

                    <CardMedia
                        component="img"
                        height="194"
                        image={case_image}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">

                            <div className={styles.employeeStory}>
                                {employee_story}
                            </div>
                            
                            {patient_name && <Chip label={'Patient`s Name: ' + patient_name}/> }
                            {patient_age && <Chip label={'Patient`s Age: ' + patient_age}/> }
                            
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <div className={styles.expand}>
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
                            <div className={styles.moreInfo}>
                                <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                        {patient_location && <Chip sx={{marginLeft: -3, marginRight: 2}} label={'Patient`s Location: ' + patient_location}/> }
                                        {reason_hcbh && <Chip label={'Reason: ' + reason_hcbh}/> }
                                        {duration_hcbh && <Chip sx={{marginLeft: -3, marginTop: 2}} label={'Duration at HCBH: ' + duration_hcbh}/> }
                                        {diagnosis && <Chip sx={{marginLeft: -3, marginTop: 2}} label={'Patient`s Diagnosis: ' + diagnosis}/> } 
                                        </Typography>
                                </CardContent>
                            </div>
                            
                                <Typography paragraph>
                                    <div className={styles.story}>
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
export default Patient_Story;