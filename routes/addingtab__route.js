const express = require('express');
const router = express.Router();
const addingtabController = require('../controller/addingtab-controller')
router.get('/',(req,res)=>{

    res.render('main')
})


router.get('/addingtab',addingtabController.addingtab)

router.get('/addingtab/data',addingtabController.addingtabData)

router.post('/addingtab',addingtabController.addingtabDataEntry)

module.exports = router;