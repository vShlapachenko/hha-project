import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

interface CaseStudyAttributes {
    patient_name?: string,
    patient_age?: string,
    patient_location?: string,
    visiting_reason?: string, 
    duration?: string,
    diagnosis?: string,
    story: string,
    breif: string, 
    image: string,
    caseImage: string,
    header: string,
    date?: string
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

const Post = ({
    patient_name='', 
    patient_age='',
    patient_location='',
    visiting_reason = '',
    duration = '',
    diagnosis = '',
    story,
    breif, 
    image,
    header,
    caseImage
  }: CaseStudyAttributes) => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={image}></Avatar>
        }
        title={header}
      />

      <CardMedia
        component="img"
        height="194"
        image={caseImage}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {breif}
          {patient_name && <Chip label={'Name: ' +  patient_name}/>}
          {patient_age && <Chip label={'Age: ' + patient_age}/>}
          {patient_location && <Chip label={'Location: ' + patient_location}/>}
          {visiting_reason && <Chip label={'Visiting Reason: ' + visiting_reason}/>}
          {duration && <Chip label={'Duration: ' + duration}/>}
          {diagnosis && <Chip label={'Diagnosis: ' + diagnosis}/>}

        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <h3>Click on the arrow to know more</h3>
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

          <Typography paragraph>Story:</Typography>
          <Typography paragraph>
            {story}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;