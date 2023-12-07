const express = require('express')
const route = express.Router()

const upload = require('../../middleware/imageUpload');
const userController = require('../../controllers/Users/usersController');
/* product routes */
route.post('/add', upload.single('profile_image'), userController.store);
route.get('/list',  userController.list);
route.get('/details/:user_id',  userController.details);
route.put('/update',  userController.update);
route.post('/delete',  userController.deleteUser);
/* end */
module.exports = route