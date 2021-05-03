
const express = require('express');
const app = express();
const main = require('./routes/index');
const board = require('./routes/board');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3002;

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
});

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'homepazi',
// });
// ``
// connection.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', main);
app.use('/board', board);
// /를 거치면 main에 있는 것을 실행하겠다. 

/*
function test(req,res,next){
  console.log(`hello middle`);
  next(); 
  //next()  다음 미들웨어로 간다. 
}

app.use(test)
// 첫번째 인자 경로.
//두번째 인자 callback()  이 함수에는 인자 3 개 받을 수 있음  req,res,next


미들웨어에 설정된 경로를 항상 거치고 실행된다. 
use에 경로값이 / 일 때
모든 경로는  /를 거치기 때문에 app.use('/')에 설정된 값을 실행하고 다음으로 넘어간다.
*/
// app.use('/',(req,res,next)=>{
//   console.log("/ 를 지나갔습니다.");
//   res.status(404).render('error.html')// 에러페이지를 보여줌. 
//   next(); 
// })

// app.use('/board',(req,res,next)=>{
//   console.log(`board 입니다.`);
//   next(); 
// })

app.get('/', (req, res) => {

  res.render('index.html');
});





app.listen(port, () => {
  console.log(`server port:${port}`);
});