import React from 'react';

import axios from 'axios';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Container, Typography, Paper, Grid, Button, Divider } from '@material-ui/core';

import { API_URI, INDICATORS, INDICATOR_MAPPINGS } from "../constants";
import { Loader } from './common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 30,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    links: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    button: {
      margin: theme.spacing(1),
    },
    progress: {
      margin: theme.spacing(2),
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

type ResultProps = {
  id: number;
  mbti: string;
}

const Indicator: React.FC<{ indicator: string, value: string, classes: any }> = ({ indicator, value, classes }) => {
  const index = Object.keys(INDICATOR_MAPPINGS[indicator]);

  return <Grid container spacing={2}>
    <Grid
      item
      xs={3}
      container
      alignItems="center"
      justify="flex-end"
    >
      <Typography component="div">
        <Box fontWeight="fontWeightBold">{INDICATOR_MAPPINGS[indicator][index[0]]}</Box>
      </Typography>
    </Grid>

    <Grid container item xs={6} spacing={0} alignItems="center" justify="center">
      <div
        className={`
          ${classes.rectangle}
          ${classes.leftRectangle}
          ${index[0] === value ? classes.activeRectangle : ''}
        `}
      />
      <div
        className={`
          ${classes.rectangle}
          ${classes.rightRectangle}
          ${index[1] === value ? classes.activeRectangle : ''}
        `}
      />
    </Grid>

    <Grid
      item
      xs={3}
      container
      alignItems="center"
      justify="flex-start"
    >
      <Typography component="div">
        <Box fontWeight="fontWeightBold">{INDICATOR_MAPPINGS[indicator][index[1]]}</Box>
      </Typography>
    </Grid>
  </Grid>
};

const Detail: React.FC<{ value: any, classes: any }> = ({ value, classes }) => (
  <>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid
        item
        xs={8}
      >
        <Typography>
          {value.question.question}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1}
      >
        <Typography align="center">
          {value.question.dimension}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1}
      >
        <Typography align="right">
          {value.question.direction}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1}
      >
        <Typography align="right">
          {value.answer}
        </Typography>
      </Grid>
    </Grid>
    <Divider />
  </>
);


const Result: React.FC = (props: any) => {
  const [result, setResult] = React.useState({} as ResultProps);
  const [details, setDetails] = React.useState({} as any);
  const [showDetails, setShowDetails] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDetailLoading, setIsDetailLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    let didCancel = false;

    const getResult = async () => {
      setIsLoading(true);
      const response = await axios.get(`${API_URI}/users/${props.match.params.id}`)
      if (!didCancel) {
        setResult(response.data);
      }
      setIsLoading(false);
    }

    getResult();
    return () => { didCancel = true; };
  }, [props.match.params.id]);

  const getDetailedResult = async () => {
    setIsDetailLoading(true);
    setShowDetails(true);
    const response = await axios.get(`${API_URI}/users/${props.match.params.id}`);
    setDetails({ ...response.data });
    setIsDetailLoading(false);
  }

  return (
    isLoading ?
      <Loader /> :
      <Container>
        <div className={classes.root}>
          {
            result.mbti &&
            <Paper className={classes.paper}>
              <Box pt={5} px={3}>

                <Grid container spacing={2}>
                  <Grid item container xs={5}>
                    <Box>
                      <Typography variant="h5" color="primary" component="div">
                        <Box fontWeight="fontWeightBold">Your Perspective</Box>
                      </Typography>
                      <Typography>
                        Your Perspective Type is
                        <Box fontWeight="fontWeightBold" component="span"> {result.mbti}</Box>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item container xs={7}>
                    {
                      result.mbti.split('').map((value, index) => (
                        <Indicator key={index} indicator={INDICATORS[index]} value={value} classes={classes} />
                      ))
                    }
                  </Grid>
                </Grid>

                <Box mt={5}>
                  <Typography align="center">
                    {
                      showDetails ?
                        <Button
                          color="secondary"
                          size="small"
                          className={classes.button}
                          onClick={() => setShowDetails(false)}
                        >
                          &lt;&lt; Less Details
                    </Button> :
                        <Button
                          color="primary"
                          size="small"
                          className={classes.button}
                          onClick={getDetailedResult}
                        >
                          More Details &gt;&gt;
                    </Button>
                    }
                  </Typography>
                </Box>

                {
                  showDetails &&
                  (
                    <Box py={3}>
                      <Box py={2}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={8}
                        >
                          <Typography variant="h6">
                            Question
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={1}
                        >
                          <Typography variant="h6" align="center">
                            Dimension
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={1}
                        >
                          <Typography variant="h6" align="right">
                            Direction
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={1}
                        >
                          <Typography variant="h6" align="right">
                            Answer
                          </Typography>
                        </Grid>
                      </Grid>
                      </Box>
                      {
                        isDetailLoading ?
                          <Loader /> :
                          details.answers &&
                          details.answers.map((value: any, index: number) => (
                            <Detail key={index} value={value} classes={classes} />
                          ))
                      }
                    </Box>
                  )
                }
              </Box>
            </Paper>
          }
        </div>
      </Container>
  );
}

export default Result;
