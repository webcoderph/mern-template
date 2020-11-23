import { React, Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    let user = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('http://localhost:5000/accounts/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      if(response.status === 200) {
        return response.json()
      } else if(response.status === 400) {
        return 'Invalid username or password'
      } 
    }).then((data) => console.log(data)).then(() => this.clearState());
  }

  clearState() {
    this.setState({
      username: '',
      password: ''
    })
  }
  
  render() {
    return (
        <div className="container">
          <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleInput(event)} /> <br/>
          <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleInput(event)} />
          <button onClick={() => this.handleSubmit()}>Login👾 </button>
        </div>
    );
  }
}

export default Login;