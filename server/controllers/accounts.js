const Account = require('../model/Account')

let expense = {}
expense.addAccount = (user) => {
  return new Promise((resolve, reject) => {
    Account.create(user, (err, result) => {
      if(err) {
        return reject(err)
      }

      return resolve(result)
    });
  }) 
}

module.exports = expense