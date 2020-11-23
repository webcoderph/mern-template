import React from 'react'
;
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {drawer: false}
  }
  toggleDrawer() {
    this.setState({
      drawer: !this.state.drawer
    })
  }

  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <AppBar style={{ background: '#6200EE' }} position="static">
          <Toolbar variant="dense">
            <IconButton onClick={() => this.toggleDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
             Budget Tracker 
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={this.state.drawer} onClose={() => this.toggleDrawer()}>
          <List>
            <ListItem button component={Link} to="/" onClick={() => this.toggleDrawer()}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={() => this.toggleDrawer()}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/accounts/login" onClick={() => this.toggleDrawer()}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/accounts/login">
            <Login />
          </Route>
        </Switch>
      </div>
    );  
  }
  
}

export default withStyles(useStyles)(App);
