const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'newboard',
}
const pool = mysql.createPool(config);


let getConnection = function (callback) {
  pool.getConnection((error, connection) => {
    if (!error)
      callback(error, connection);
    connection.release();
  })
}


module.exports = getConnection;



// function getConnection(callback) {
//   pool.getConnection(function (err, conn) {
//     if (!err) {
//       callback(conn);
//     }
//   });
// }

// pool.getConnection((err,connection)=>{
//   if(error) throw err;
//   connection.query(`select * from gesipan`,(error,results,fields)=>{
//     
//     if(error) throw error
//     console.log(results);
//   })

// });
