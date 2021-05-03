
create database newBoard; 
use newBoard; 

-- boardTB : userTB = 1:1
--commentTB : boardTb = N:1

create table boardTB(
    idx int(11) not null Auto_increment primary key,
    subject varchar(100) not null,
    userId varchar(50) not null, 
    content text, 
    today datetime default current_timestamp, 
    hit int(11)
) Auto_increment=1 default charset=utf8mb4; 

-- boardTB : userTB = 1:1
-- userTB : commentTb = 1:1 
create table userTB(
  userId varchar(50) not null unique,
  userPw varchar(255) not null, 
  userName varchar(30) not null, 
  userImage varchar(255) not null
)default charset=utf8mb4;


-- userTB : commentTb = 1:1 
--commentTB : boardTb = N:1
create table commentTB(
  idx int(11) not null Auto_increment primary key,
  userid varchar(50) not null,
  content text, 
  today datetime default current_timestamp
)default charset=utf8mb4;








