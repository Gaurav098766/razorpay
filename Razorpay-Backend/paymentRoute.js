const express = require('express');
const { createOrder, getLogo, paymentCallback,getPayment } = require('./paymentController');
const router = express.Router();

router.get('/createorder', createOrder);
router.post('/payment/callback',paymentCallback)
router.get('/payments/:paymentId',getPayment)
router.get('/logo',getLogo)

module.exports = router;