import { React, Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import  { Redirect } from 'react-router-dom'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '77%',
    left: '50%',
    marginTop: -2,
    marginLeft: -12,
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      loading: false,
      success: false
    }
  }

  componentDidMount() {
    toast.configure()
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    if(!this.state.loading) {
      this.setState({loading: !this.state.loading})
    }

    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    try {
      await fetch('http://localhost:5000/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then((response) => response.json())
        .then((response) => {
          if (response.hasOwnProperty('errors'))  {
            const messages = Object.values(response.errors).map(val => val.message);
            messages.forEach(message => {
              toast.error(message, {position: toast.POSITION.TOP_RIGHT})
            }); 
            this.setState({loading: !this.state.loading})
          } else {
             toast.success('You have successfully registered a new user!', toast.POSITION.TOP_RIGHT)
             this.clearState() 
             setTimeout(() => this.setState({success: true}), 3000)
          }
        })
        .catch((error) => console.log(error));
    } catch(error) {
      console.log(error)
    }
  }

  clearState() {
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }
  
  render() {
    const { classes } = this.props

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="email" id="email" label="Email" value={this.state.email} variant="outlined" fullWidth autoComplete="email" onChange={(event) => this.handleInput(event)} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="username" id="username" label="Username" value={this.state.username} variant="outlined" fullWidth autoComplete="username" onChange={(event) => this.handleInput(event)} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="password" type="password" id="password" label="Password" value={this.state.password} variant="outlined" fullWidth autoComplete="password" onChange={(event) => this.handleInput(event)} />
              </Grid>
            </Grid>
            <Button type="submit" disabled={this.state.loading} variant="contained" color="primary" className={classes.submit} fullWidth onClick={(e) => this.handleSubmit(e)}>Sign-Up</Button> 
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            {this.state.success && <Redirect to="/accounts/login" /> }
          </form>
        </div>
        
         
      </Container>
    );
  }

 
}

export default withStyles(useStyles)(Register);