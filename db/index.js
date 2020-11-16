const mysql = require('mysql')

const pool = mysql.createPool({
              connectionLimit: 10,
              user:'root',
              password: 'root',
              database: 'serviceseeking_development',
              port: 3306
            })

let ss = {}

ss.articles = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM blog_articles', (err, result) => {
      if(err) {
        return reject(err)
      }

      return resolve(result)
    })
  })
}

module.exports = ss