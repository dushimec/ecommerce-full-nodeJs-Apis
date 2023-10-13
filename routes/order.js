const express = require('express');
const { findOders, postOrders } = require('../controllers/ordersClt');
const orderRouter = express.Router()

orderRouter.get('/allOrders',findOders)
orderRouter.put('/registerOrders',postOrders)

module.exports = orderRouter;