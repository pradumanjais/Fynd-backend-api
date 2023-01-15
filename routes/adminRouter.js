const router=require('express').Router();
const adminController=require('../controller/adminControllor');
const ComplainController=require('../controller/ComplainControllor');


//Admin Registration routes
router.post('/admin/reg',adminController.adminregister);



//Admin Login routes
router.post('/admin/login',adminController.adminlogin);


//information generate

router.post('/admin/infogen',adminController.info_genrate);

//fetch informatiopn
router.post('/admin/fetchinfo',adminController.fetch_info);

//fetch informatiopn
router.delete('/admin/deleteinfo/:infoid',adminController.info_delete);

// Register complain route
router.post('/admin/complainReg',ComplainController.complain_register);


//fetch complain
router.post('/admin/fetchcomplain',ComplainController.fetch_complain);


//export router
module.exports=router;