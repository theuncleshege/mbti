import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Radio, Box, Container, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const questions = [
  {
    "question": "You find it takes effort to introduce yourself to other people.",
    "name": "introduce",
  },
  {
    "question": "You consider yourself more practical than creative.",
    "name": "consider",
  },
  {
    "question": "Winning a debate matters less to you than making sure no one gets upset.",
    "name": "debate",
  },
  {
    "question": "You get energized going to social events that involve many interactions.",
    "name": "social",
  },
  {
    "question": "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
    "name": "explore",
  },
  {
    "question": "Deadlines seem to you to be of relative rather than absolute importance.",
    "name": "deadlines",
  },
  {
    "question": "Logic is usually more important than heart when it comes to making important decisions.",
    "name": "logic",
  },
  {
    "question": "Your home and work environments are quite tidy.",
    "name": "tidy",
  },
  {
    "question": "You do not mind being at the center of attention.",
    "name": "attention",
  },
  {
    "question": "Keeping your options open is more important than having a to-do list.",
    "name": "options",
  },
];

const DisplayFormikState = (props: any) =>
<div style={{ margin: '1rem 0' }}>
  <h3 style={{ fontFamily: 'monospace' }} />
  <pre
    style={{
      background: '#f6f8fa',
      fontSize: '.65rem',
      padding: '.5rem',
    }}
  >
    <strong>props</strong> ={' '}
    {JSON.stringify(props, null, 2)}
  </pre>
</div>;

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

interface IQuestionObject {
  [key: string]: number | string | boolean;
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
  question: string
  name: string
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  touched?: boolean
  error?: string
  classes: any
};

const Question: React.FC<QuestionProps> = ({classes, ...props}) => {
  // const [values, setValues] = React.useState(initialState);

  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setValues(vals => ({
  //     ...vals,
  //     [event.target.name]: +event.target.value
  //   }));
  // }

  // console.log(values);

  return (
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
            {/* {[1, 2, 3, 4, 5, 6, 7].map(value => (
              <Radio
                key={value}
                checked={values[props.name] === value}
                onChange={handleChange}
                value={value}
                name={props.name}
                inputProps={{ 'aria-label': ''+value }}
              />
            ))} */}
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
}

const Questionnaire: React.FC = () => {
  const classes = useStyles();

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

      <Box my={5}>
        <Container maxWidth="md">
          <Formik
            initialValues={ initialState }
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={schema}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleSubmit,
                handleBlur,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  {
                    questions.map(value => (
                      <Question
                        question={value.question}
                        name={value.name}
                        onChange={handleChange}
                        value={values[value.name] as number}
                        touched={touched[value.name] as boolean}
                        error={errors[value.name] as string}
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
                      <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isSubmitting}>
                        Save & Continue
                      </Button>
                    </Grid>
                  </Box>

                  <DisplayFormikState {...props} />
                </form>
              );
            }}
          </Formik>
        </Container>
      </Box>
    </Container>
  );
}

export default Questionnaire;
  