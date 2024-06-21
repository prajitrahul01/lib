import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Box, Typography, makeStyles } from '@mui/material';
import { styled } from '@mui/system';
import auImage from '../../static/images/aulib.jpg';
import sapImage from '../../static/images/sap_lib_front.jpg';
import mitImage from '../../static/images/mit_lib_front.jpg';
import './index.css';
import { FiCard, FiCardActionArea, FiCardActions, FiCardContent } from './FullImageCard';


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
    /**
     * Max Card with for demo
     * same values used in Material-Ui Card Demos
     */
    card: {
      maxWidth: 345
    },
  
    /**
     * Applied to Orginal Card demo
     * Same vale used in Material-ui Card Demos
     */
    media: {
      height: 140
    },
  
    /**
     * Demo stlying to inclrease text visibility
     * May verry on implementation
     */
    fiCardContent: {
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,.24)"
    },
    fiCardContentTextSecondary: {
      color: "rgba(255,255,255,0.78)"
    }
  });

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
        <FiCard className={classes.card}>
          <FiCardActionArea>
            <FiCardActions
              media="picture"
              alt="Contemplative Reptile"
              image={image}
            />
          </FiCardActionArea>
        </FiCard>
        ))}
      </Box>
  );
  // return (
  //   <div  >
  //   <ImageContainer className='cen'>
  //     {images.map((image, index) => (
  //       <ImageCard key={index} style={{ opacity: index === currentIndex ? 1 : 0 }}>
  //         <CardMedia
  //           component="img"
  //           image={image}
  //           alt={`Image ${index}`}
  //         />
  //       </ImageCard>
  //     ))}
  //   </ImageContainer>
  //   </div>
  // );
};

// Styled components
const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'fixed',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  transform: 'translate(10%, 12%)'
}));

const ImageCard = styled(Card)(({ theme }) => ({
  width: '100%', 
  height: '100%', 
  position: 'absolute',
  top: 0,
  left: 0,
  // transform: 'translate(-10%, 12%)',
  transition: 'opacity 1s ease',
}));

export default CascadingImages;