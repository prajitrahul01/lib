import React, { useEffect, useState } from 'react';
import { Box, Typography, makeStyles } from '@mui/material';
import { FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from './FullImageCard';
import auImage from '../../static/images/aulib.jpg';
import sapImage from '../../static/images/sap_lib_front.jpg';
import mitImage from '../../static/images/mit_lib_front.jpg';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

const CascadingImages = () => {
  const images = [
    auImage,
    mitImage,
    sapImage
  ];
  const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    
    card: {
      maxWidth: 345
    },
  
    media: {
      height: 140
    },
 
    fiCardContent: {
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,.24)"
    },
    fiCardContentTextSecondary: {
      color: "rgba(255,255,255,0.78)"
    }
  });

  const classes = useStyles(); // Add this line to get classes

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box my={4}>
        <Typography variant="h6" paragraph align="center">
          Full Image Card
        </Typography>
        {images.map((image, index) => (
          <FiCard className={classes.card} key={index}>
            <FiCardActionArea>
              {/* Assuming you have FiCardContent and FiCardMedia components */}
              <FiCardContent>
                <FiCardMedia component="img" image={image} alt={`Image ${index}`} />
              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        ))}
      </Box>
  );
};

export default CascadingImages;
