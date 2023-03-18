const express = require('express');
const router = express.Router();
const addingtabController = require('../controller/addingtab-controller')


router.get('/',addingtabController.addingtab)

router.get('/addingtab/data',addingtabController.addingtabData)

router.post('/addingtab',addingtabController.addingtabDataEntry)

router.get('/logtab/edit/:id',addingtabController.editLogtab);

router.post('/logtab/edit/:id',addingtabController.editLogtabUpdate);

router.delete('/logtab/delete/:id',addingtabController.deleteLogtab)
module.exports = router;