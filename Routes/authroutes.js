const { Router } = require('express')
const authController = require('../controllers/authcontroller')



const router = Router();
router.post('/comapanysignup', authController.comapanysignup_post);
router.post('/employeesignup', authController.employeesignup_post);
router.get('/searchdata', authController.searchdata_get);
router.get('/addfieldss', authController.addfieldss_get);
router.get('/searchemp', authController.searchemp_get);
router.get('/gettdata', authController.gettdata_get);
router.get('/example', authController.example_get);
router.get('/pushh', authController.pushh_get);
router.get('/group', authController.group_get);
router.get('/rgx', authController.rgx_get);

// router.get('/getemployee', authController.getemployee_get);



//getemployee_get
module.exports = router;



