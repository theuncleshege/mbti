import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    rectangle: {
      width: 100,
      height: 13,
      backgroundColor: '#bbbbbb',
    },
    leftRectangle: {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    rightRectangle: {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    activeRectangle: {
      backgroundColor: '#3f51b5'
    }
  }),
);

const results: any = {
  "ei": {
    "option1": "Introversion",
    "option2": "Extraversion",
    "result": "Extraversion",
  },
};

const Result: React.FC<{details: any, classes: any}> = ({details, classes}) => {
  console.log(details);
  return <Grid container spacing={2}>
    <Grid
      item
      xs={3}
      container
      alignItems="center"
      justify="flex-end"
    >
      <Typography component="div">
        <Box fontWeight="fontWeightBold">Introversion (I)</Box>
      </Typography>
    </Grid>

    <Grid container item xs={6} spacing={0} alignItems="center" justify="center">
      <div className={`${classes.rectangle} ${classes.leftRectangle} ${classes.activeRectangle}`}>

      </div>
      <div className={`${classes.rectangle} ${classes.rightRectangle}`}>

      </div>
    </Grid>

    <Grid
      item
      xs={3}
      container
      alignItems="center"
      justify="flex-start"
    >
      <Typography component="div">
        <Box fontWeight="fontWeightBold">Extraversion (E)</Box>
      </Typography>
    </Grid>
  </Grid>
};


const Results: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
       <div className={classes.root}>
        <Paper className={classes.paper}>
          <Box py={5} px={3}>
            <Grid container spacing={2}>
              <Grid item container xs={6}>
                <Box>
                  <Typography variant="h5" color="primary" component="div">
                    <Box fontWeight="fontWeightBold">Your Perspective</Box>
                  </Typography>
                  <Typography>
                    Your Perspective Type is ENTJ
                  </Typography>
                </Box>
              </Grid>

              <Grid item container xs={6}>
                {/* <Box> */}
                {
                  Object.keys(results).map((value, index) => (
                    <Result key={index} details={results[value]} classes={classes} />
                  ))
                }
                {/* </Box> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
    </Container>
  );
}

export default Results;
