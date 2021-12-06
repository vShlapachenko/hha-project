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
import "./Other_Story.css";


interface CaseStudyAttributes {
    image?: string,
    heading?: string,
    breif?: string,
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

const Other_Story = ({image, heading, breif, story}: CaseStudyAttributes) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <div className={'component'}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        // avatar={
                        //     <Avatar src={image}> </Avatar>
                        // }
                        title={heading}
                    />

                    <CardMedia
                        component="img"
                        height="194"
                        image={image}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">

                            <div className={'employeeStory'}>
                                {breif && <Chip label={'Breif: ' + breif}/>}
                            </div>
                            
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
export default Other_Story;