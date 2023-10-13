
const OrderItems = require("../models/orderItem");
const Orders = require("../models/orders");

const findOders = (async (req, res) => {
    const OrderList = await Orders.find({});

    if (!OrderList) {
        res.status(500).json({ success: false })
    }
    res.send(OrderList)
})

const postOrders = (async (req, res) => {

    const ordrItemsIds = Promise.all(req.body.orderItems.map(async orderitem => {
        let newOrderItem = new OrderItems({
            quantity: orderitem.quantity,
            product: orderitem.product
        })
        newOrderItem = await newOrderItem.save()

        return newOrderItem._id;
    }))
    const orderIds = await ordrItemsIds
    

    let order = new Orders({
        orderItems: orderIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    })
    await order.save()
        .then(posted => {
            res.status(200).json(posted)
        })
        .catch((err) => {
            res.status(404).json({ success: false, })
        })

})

module.exports = { findOders, postOrders }