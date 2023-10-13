const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    countinStock:{
        type:Number,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default: 0
    },
    numReview:{
        type:Number,
        default: 0
    },
    isFeatured:{
        type:Boolean,
        default: false
    },
    dateCreated:{
        type:Date,
        default: Date.now
        
    }
    
});
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
productSchema.set('toJSON',{
    virtual:true
})
const Product = mongoose.model('product',productSchema);
module.exports = Product;