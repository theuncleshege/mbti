import React from 'react';

import { Box, Typography, CircularProgress, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

export const Loader: React.FC = () => {
  const classes = useStyles();
  return (
    <Box my={5}>
        <Typography align="center" component="div">
        <CircularProgress className={classes.progress} />
        </Typography>
    </Box>
  );
};