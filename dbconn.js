// const mysql = require('mysql');

// const config ={
//   host:'localhost',
//   user:'root',
//   password:'1234',
//   databases:'homepazi', 
// }
// const pool = mysql.createPool(config);


// function getConnection(callback) {
//   pool.getConnection(function (err, conn) {
//     if(!err) {
//       callback(conn);
//     }
//   });
// }

// pool.getConnection((err,connection)=>{
//   if(error) throw err;
//   connection.query(`select * from gesipan`,(error,results,fields)=>{
//     connection.release(); 
//     if(error) throw error
//     console.log(results);
//   })

// });

// module.exports = getConnection; 