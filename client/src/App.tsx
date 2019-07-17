import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { makeStyles, Theme, createStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

import Questionnaire from './components/Questionnaire';
import Result from './components/Result';
import Results from './components/Results';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    links: {
      color: '#ffffff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography align="center" variant="h6" className={classes.title}>
              <Link to="/" className={classes.links}>Home</Link>
            </Typography>
            <Typography align="center" variant="h6" className={classes.title}>
              <Link to="/results" className={classes.links}>All Results</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={Questionnaire} />
        <Route exact path="/results/:id" component={Result} />
        <Route exact path="/results" component={Results} />
      </div>
    </Router>
  );
}

export default App;
