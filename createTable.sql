create database homepazi; 
use homepazi; 

create table gesipan(
    idx int(11) not null Auto_increment primary key,
    subject varchar(100) not null,
    id varchar(50) not null, 
    content text, 
    today datetime default current_timestamp, 
    hit int(11) default '0'
) Auto_increment=1 default charset=utf8mb4; 

-- select A.userid, B.userName from boardTB as A userTB as B; 

-- select A.userId, B.userName, A.subject, A.content, from boardTB as A join userTB as B on A.userid = b.userid; 

-- select * from commentTB as a join userTB ad b on a.userId = b.userid; 