const router = require('express').Router();


router.get('/register', (req, res)=>{
  res.send('Hi, server is running');
});

module.exports = router;