// const mysql = require('mysql')

// const pool = mysql.createPool({
//               connectionLimit: 10,
//               user:'root',
//               password: 'root',
//               database: 'serviceseeking_development',
//               port: 3306
//             })

const { Pool, types } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'maynardcabalitan',
  password: '',
  database: 'budget_development',
  port: 5432
})

types.setTypeParser(1700, function(val) {
  return parseFloat(val);
})

let expense = {}

expense.articles = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM accounts', (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

expense.addAccount = (account) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO accounts(username, password, email, balance) VALUES ($1, $2, $3, $4)', [account.username, account.password, account.email, 0.00], (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

expense.updateBalance = (account) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE accounts SET balance = $1 WHERE user_id = $2', [account.balance, account.user_id], (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

expense.addTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO account_transactions(transaction_type, amount, user_id)', [transaction.transaction_type, transaction.amount, transaction.user_id], (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

expense.findUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM accounts WHERE username = $1', [username], (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

expense.disconnect = () => {
  return pool.end()
}

module.exports = expense