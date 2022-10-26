import React, { SyntheticEvent } from 'react';

import clsx from 'clsx';
import axios from 'axios';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Radio, Box, Container, Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { TextField } from 'formik-material-ui';

import { API_URI, getAxiosError } from "../constants";
import { Loader } from './common';

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 768,
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
    green: {
      color: 'green',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const snackbarStyles = makeStyles((theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.secondary.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface IQuestionObject {
  [key: string]: number | string | boolean;
}

interface IQuestionProps {
  id: number;
  question: string;
  slug: string
}

const initialState: IQuestionObject = {
  introduce: 0,
  consider: 0,
  debate: 0,
  social: 0,
  explore: 0,
  deadlines: 0,
  logic: 0,
  tidy: 0,
  attention: 0,
  options: 0,
  email: ''
}

const errorMsg = 'Please choose an option';

const schema = Yup.object().shape({
  introduce: Yup.number().min(1, errorMsg).max(7, errorMsg),
  consider: Yup.number().min(1, errorMsg).max(7, errorMsg),
  debate: Yup.number().min(1, errorMsg).max(7, errorMsg),
  social: Yup.number().min(1, errorMsg).max(7, errorMsg),
  explore: Yup.number().min(1, errorMsg).max(7, errorMsg),
  deadlines: Yup.number().min(1, errorMsg).max(7, errorMsg),
  logic: Yup.number().min(1, errorMsg).max(7, errorMsg),
  tidy: Yup.number().min(1, errorMsg).max(7, errorMsg),
  attention: Yup.number().min(1, errorMsg).max(7, errorMsg),
  options: Yup.number().min(1, errorMsg).max(7, errorMsg),
  email: Yup.string().email().required(),
});

type QuestionProps = {
  question: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
  classes: any;
};

const Question: React.FC<QuestionProps> = ({classes, ...props}) => (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid item container xs={12} justify="center">
        <Box my={3} fontWeight="fontWeightBold">{props.question}</Box>
      </Grid>
        
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          container
          alignItems="center"
          justify="flex-end"
        >
          <Typography color="error" component="div">
            <Box fontWeight="fontWeightBold">Disagree</Box>
          </Typography>
        </Grid>

        <Grid container item xs={8} justify="space-evenly">
          {[1, 2, 3, 4, 5, 6, 7].map(value => (
            <Radio
              key={value}
              value={value}
              checked={+props.value === value}
              onChange={props.onChange}
              name={props.name}
              inputProps={{ 'aria-label': ''+value }}
            />
          ))}
        </Grid>

        <Grid
          item
          xs={2}
          container
          alignItems="center"
          justify="flex-start"
        >
          <Typography className={classes.green} component="div">
            <Box fontWeight="fontWeightBold">Agree</Box>
          </Typography>
        </Grid>
      </Grid>
      
      <Grid item container xs={12} justify="center">
        {props.touched && props.error && <div className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">{props.error}</div>}
      </Grid>
    </Paper>
  </div>
);

type SnackbarProps = {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
  classes: any;
}

const MySnackbarContentWrapper: React.FC<SnackbarProps> = ({classes, ...props}) => {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const Questionnaire: React.FC = (props: any) => {
  const classes = useStyles();
  const snackbarClasses = snackbarStyles();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [questions, setQuestions] = React.useState([] as Array<IQuestionProps>);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let didCancel = false;
  
    async function getQuestions() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URI}/questions`);
        if (!didCancel) {
          setQuestions(response.data);
        }
      } catch(error) {
        setError(getAxiosError(error));
        setOpen(true);
      }
      setIsLoading(false);
    }  
  
    getQuestions();
    return () => { didCancel = true; };
  }, []);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <Container>
      <Box my={5}>
        <Typography color="primary" component="div">
          <Box fontWeight="fontWeightBold">Discover Your Perspective</Box>
        </Typography>
        <Typography component="div">
          Complete the 7 min test and get a detailed report of your lenses on the world.
        </Typography>
      </Box>

      {
        isLoading ?
        <Loader /> :
        <Box my={5}>
          <Container maxWidth="md">
            <Formik
              initialValues={ initialState }
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await axios.post(
                    `${API_URI}/users`,
                    values
                  );
                  props.history.push(`/results/${response.data['id']}`)
                } catch(error) {
                  setError(getAxiosError(error));
                  setOpen(true);
                  setSubmitting(false);
                }
              }}
              validationSchema={schema}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  isValid,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    {
                      questions.length > 0 ?
                      <>
                        {
                          questions.map(value => (
                            <Question
                              key={value.slug}
                              question={value.question}
                              name={value.slug}
                              onChange={handleChange}
                              value={values[value.slug] as number}
                              touched={touched[value.slug] as boolean}
                              error={errors[value.slug] as string}
                              classes={classes}
                            />
                          ))
                        }

                      <Paper className={classes.paper}>
                        <Box fontWeight="fontWeightBold" mt={1} textAlign="center">Your Email</Box>

                        <Box fontWeight="fontWeightBold" mb={1}>
                          <Grid item container xs={12} justify="center">
                            <Field
                              component={TextField}
                              id="email"
                              type="email"
                              name="email"
                              className={classes.textField}
                              placeholder="you@example.com"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        </Box>
                      </Paper>
                      
                      <Box fontWeight="fontWeightBold" my={5}>
                        <Grid item container xs={12} justify="center">
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            disabled={isSubmitting || !isValid}
                          >
                            Save & Continue
                          </Button>
                        </Grid>
                      </Box>
                    </>
                    :
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      open
                    >
                      <MySnackbarContentWrapper
                        variant="info"
                        message="No questions available"
                        classes={snackbarClasses}
                      />
                    </Snackbar>
                  }
                  </form>
                );
              }}
            </Formik>
          </Container>
        </Box>
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="error"
          message={error}
          classes={snackbarClasses}
        />
      </Snackbar>
    </Container>
  );
}

export default Questionnaire;
  