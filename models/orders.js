const mongoose = require('mongoose')

const oderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItm',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,

    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },

})
oderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
oderSchema.set('toJSON',{
    virtual:true
})
const Orders = mongoose.model("orders", oderSchema)
module.exports = Orders;