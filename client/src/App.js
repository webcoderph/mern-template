import React from 'react'
;
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchTech()
  }

  fetchTech() {
    fetch('https://reddit.com/r/technology.json')
    .then(response => response.json())
    .then(data => console.log(data))
  }
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );  
  }
  
}

export default App;
