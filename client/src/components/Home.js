import { React, Component } from 'react'
import logo from '../logo.svg'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      amount: 0,
      user_id: 0
    }
  }

  componentDidMount() {
    this.fetchTech()
  }

  fetchTech() {
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then(data => this.setState({accounts: data}))
  }

  handleTransaction() {
    let user = {
      user_id: this.state.user_id, 
      balance: 0//(this.state.accounts.filter((user) => user.user_id === parseInt(this.state.user_id))[0].balance + parseFloat(this.state.amount)) 
    }
     //console.log(this.state.accounts[i].balance)
     //console.log((parseFloat(this.state.accounts[i].balance) + parseFloat(this.state.amount)) ) 
     //console.log(this.state.accounts.filter((user) => user.user_id === parseInt(this.state.user_id)).map((u) => parseFloat(u.balance)))
   
    fetch('http://localhost:5000/accounts/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function(response) {
    return response.json();
    }).then(() => this.fetchTech()).then(() => this.clearState());
  }

  clearState() {
    this.setState({
      amount: 0.00,
      user_id: 0
    })
  }

  handleUser(e) {
    this.setState({user_id: parseInt(e.target.value) || 0})
  }
 
  handleAmount(e) {
    this.setState({amount: e.target.value})
  }

  render() {
    return (
        <div className="container">
          <ul>
            {this.state.accounts.map((account,index)=>{
              return <li key={index}>id: {account._id} NAME: {account.username}<br/> Balance: {parseFloat(account.balance.$numberDecimal)}</li>
            })}
          </ul>
          <input type="text" name="user_id" value={this.state.user_id} onChange={(event) => this.handleUser(event)} />
          <input type="text" name="amount" value={this.state.amount} onChange={(event) => this.handleAmount(event)} />
          <button onClick={() => this.handleTransaction()}>INSERT👾 </button>
        </div>
    );
  }
}

export default Home;