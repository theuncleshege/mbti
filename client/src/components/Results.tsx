import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Container, List, ListItem, ListItemText, Divider, Paper, Typography } from '@material-ui/core';

import { API_URI } from "../constants";
import { Loader } from './common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 30,
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 360,
    },
    inline: {
      display: 'inline',
    },
    links: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);

type ResultProps = {
  id: number;
  email: string;
  mbti: string;
  updated_at: string;
}

const Result: React.FC<{value: ResultProps, classes: any}> = ({value, classes}) => (
  <Link to={`/results/${value.id}`} className={classes.links}>
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={value.email}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              <Box fontWeight="fontWeightBold" component="span">{value.mbti}</Box>
            </Typography>
            {` - ${value.updated_at}`}
          </>
        }
      />
    </ListItem>
    <Divider component="li" />
  </Link>
);


const Results: React.FC = () => {
  const [results, setResults] = React.useState([] as Array<ResultProps>);
  const [isLoading, setIsLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    let didCancel = false;
  
    async function getResults() {
      setIsLoading(true);
      const response = await axios.get(`${API_URI}/users`)
      if (!didCancel) {
        setResults(response.data);
      }
      setIsLoading(false);
    }  
  
    getResults();
    return () => { didCancel = true; };
  }, []);

  return (
    isLoading ?
      <Loader /> :
    <Container className={classes.root}>
    {
      results.length > 0 &&
      <Paper className={classes.paper}>
        <List className={classes.list}>
          {
            results.map((value, index) => (
              <Result key={index} value={value} classes={classes} />
            ))
          }
        </List>
      </Paper>
    }
    </Container>
  );
}

export default Results;
