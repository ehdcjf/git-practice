const express = require('express');
const router = express.Router(); 

router.get('/',(req,res)=>{
  console.log("hello Router!"); 
  res.render('index.html',{
    title:'homepage', 
  })
});

module.exports = router; 