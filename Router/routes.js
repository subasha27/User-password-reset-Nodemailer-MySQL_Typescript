const express = require("express");
const router = express.Router();
const { authschema, Sign } = require("../Models/models");
const functi = require('../Controller/function');
const userFuncti = require('../Controller/userControl')

//crud
router.post('/createIt',functi.createUser);
router.put('/createIt/:id',functi.updateUser);
router.delete('/createIt/:id',functi.deleteUser);
router.get('/getIt/:id',functi.getUser);
router.get('/getAll',functi.getAllUser);

//user control
router.post('/UserSign',userFuncti.userSign);
router.post('/UserPassReset',userFuncti.passRequest);
router.post('/PassChange/:token',userFuncti.passChange);



module.exports = router;
