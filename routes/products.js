const express = require('express');
const { insert, findUser, findUserById, DeleteProduct, updateProduct, countProduct, productFeatured } = require('../controllers/prductCtl');
const router = express.Router()

router.post('/add',insert);
router.get('/findAll',findUser);
router.get('/findOne/:id',findUserById);
router.get('/get/count',countProduct);
router.get('/get/featured/:count',productFeatured);
router.delete('/delete/:id',DeleteProduct);
router.put('/update/:id',updateProduct);

module.exports = router;