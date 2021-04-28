const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const articleCount=10;
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'homepazi',
});

connection.connect();

// let SQL = require('./dbconn');


// 여기서 get('/board/list')를 하지 않는 이유는 이미 앞에 server.js의 app.use에서 받아왔기 때문.

router.get('/list', (req, res) => {
    let sql = `select idx,subject,id,content,hit,date_format(today,'%Y-%m-%d')as today,number from gesipan order by idx desc `;
    let page=req.query.page;
    //최초시작할 때. page=1로 받을 수 있도록 관련된 html을 수정해야함. 
    // 뷰에서 리스트로 갈 때, 삭제할때, 
    if(page==undefined) page=1; //일단 이렇게 막아놓자.
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
//===========글 삭제를 고려하여  글 번호를 바꾸는 부분.             
            let total_record = results.length;
            results.forEach(ele => {
                ele.number = total_record--;
            });
//==========pagination start============
            let article = results.length; // 글 갯수를 받는 변수 
            // const articleCount = 10; //제일 위에 const로 설정. 
            let arr = [[]];  //arr는 이차원 배열.(1행에는 1부터 10까지 2행에는 11부터 20까지.)
            let i = 0;  //2차원배열을 사용한 이유는 for in문을 활용하기 위함. for in문은 배열을 반복해서 범위를 정해주려면 range를 써야함. 
            let j = 1; //range를 이용하면 1차원 배열로 가능???
            //이중 배열을 만들기 위한 반복문. (( 더 좋은 아이디어 찾기))    
            while (article > 0) {
                if (j > articleCount) {
                    j = 1;
                    i++;
                    arr[i] = [];
                }
                arr[i].push(i * articleCount + j);
                article -= articleCount;
                j++;
            }

            let last = i * articleCount + j-1; //끝 버튼 눌럿을 때 사용. 마지막 페이지를 의미  
            let prev = Number(page); //이전 버튼 눌렀을 때 사용. page의 type이 String이라 바꿔줘야함.  
                do{
                    prev--
                }while(prev%articleCount!=0); 

            let next =Number(page);  //다음버튼 눌럿을 떄 사용. 
                do{
                    next++
                }while(next%articleCount!=1);

            let pagiBlock=Math.floor((page-1)/articleCount);//배열에서 원하는 행을 불러오기 위해 만든 변수
            let selectedResult=[]; //results에서 페이지 조건에 맞는 글만 추출하여 담는 배열. 
            // 페이지 조건에 맞는 글만 추출하는 반복문.. 일단 만들기는 했는데 
            // where절에 조건문 주고 거기에 limit하면 될듯. 
            //sql 실행하는 함수가 빠를까 for문 끝까지 돌리는 게 빠를까. 
            for(let i=0; i<results.length; i++){
                if(results[i].number<=results.length-(page-1)*articleCount){
                    selectedResult.push(results[i]); 
                }
                if(selectedResult.length==articleCount) break; 
            }
            
//==========pagination end============
//list로 연결된거도 다 바꿔줘야함.
            res.render('./board/list.html', {
                list: selectedResult,
                pagiBlock:pagiBlock,
                page:page,
                arr:arr,
                last:last,
                prev:prev,
                next:next,  
            });
        }
    });
});

router.get('/write', (req, res) => {
    res.render('./board/write.html');
})

router.post('/write', (req, res) => {
    let body = req.body;
    let sql = `insert into gesipan (subject,id,content)
                values('${body.subject}','${body.id}','${body.content}')`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect(`/board/view?idx=${results.insertId}`)
        }
    })
})

router.get('/view', (req, res) => {
    let idx = req.query.idx
    let sql0 = `select idx,number from gesipan order by idx desc `;
    let page; 
    connection.query(sql0,(error,results)=>{
        if (error) {
            console.log(error);
        } else {
            let total_record = results.length;
            results.forEach(ele => {
                ele.number = total_record--;
                if(ele.idx==idx){ page=Math.floor((results.length-ele.number)/articleCount)+1; 
                }
            });
            
        }
    })
    let sql = `update gesipan set hit=hit+1 where idx=${idx};`
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            let sql = `select  idx,subject,id,content,hit,date_format(today,'%Y-%m-%d') as today from gesipan where idx=${idx};`
            connection.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.render('./board/view.html', { 
                        list: results[0] ,
                        page:page,
                    });
                };
            });
        }
    });
});

router.get('/modify', (req, res) => {
    let idx = req.query.idx;
    let sql = `select idx, subject,id,content from gesipan where idx=${idx};`
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('./board/modify.html', {
                modify: results[0],
                page:page,
            })
        }
    });
});

router.post('/modify', (req, res) => {
    let body = req.body;
    let sql = `update gesipan set subject='${body.subject}', id='${body.id}', content='${body.content}' where idx=${body.idx};`
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {

        }
        res.redirect(`/board/view?idx=${body.idx}`)
    })
});

router.get('/delete', (req, res) => {
    let idx = req.query.idx;
    let sql0 = `select idx,number from gesipan order by idx desc `;
    let page; 
    connection.query(sql0,(error,results)=>{
        if (error) {
            console.log(error);
        } else {
            let total_record = results.length;
            results.forEach(ele => {
                ele.number = total_record--;
                if(ele.idx==idx){ page=Math.floor((results.length-ele.number)/articleCount)+1; 
                }
            });
            
        }
    })

    let sql = `delete from gesipan where idx=${idx};`
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            
            res.redirect(`/board/list?page=${page}`);
        }
    });
})


module.exports = router;