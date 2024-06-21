import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Card, CardMedia } from '@mui/material';
import auImage from '../../static/images/aulib.jpg';
import sapImage from '../../static/images/sap_lib_front.jpg';
import mitImage from '../../static/images/mit_lib_front.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));

const images = [
  auImage,
  mitImage,
  sapImage
];

const CascadingImg = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={image}
                title={`Image ${index}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CascadingImg;
