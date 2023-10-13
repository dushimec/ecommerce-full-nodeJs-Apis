const Category = require("../models/category");
const Product = require("../models/product");
const mongoose = require('mongoose');

const insert = (async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).send("Invalid Category")

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countIstock: req.body.countIstock,
        rating: req.body.rating,
        numReview: req.body.numReview,
        isFeatured: req.body.isFeatured,
    })
    await product.save()

    if (!product)
        return res.status(500).send("Product cannot created")
    return res.send(product)


})
const findUser = (async (req, res) => {
    let filter = {}
    if (req.query.categoris)
    {
        filter = {category: req.query.categoris.split(',')}
    }
    const productList = await Product.find(filter).populate("category")
    if (!productList) {
        res.status(404).json({
            message: "No Product List in Stock",
            success: false
        })
    } else {
        res.json(productList)
    }

})
const findUserById = (async (req, res) => {
    const id = req.params.id
    const getuserbyid = await Product.findById(id).populate("category")
    if (!getuserbyid) {
        res.status(404).json({
            message: "Nothing With This Product Id",
            success: false
        })

    } else {
        res.json(getuserbyid)
    }


})
const updateProduct = (async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404).send("Invalid Product Id")
    }
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).send("Invalid Category")

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countIstock: req.body.countIstock,
        rating: req.body.rating,
        numReview: req.body.numReview,
        isFeatured: req.body.isFeatured,
    },
        { new: true }
    )

    if (!product) {
        res.status(404).json({ success: false, message: "Category Not Updated" })
    } else {
        res.status(200).json(product)


    }
})

const DeleteProduct = ((req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (product) {
                res.status(200).json({ success: true, message: "Product Deleted" })
            } else {
                res.status(404).json({ success: false, message: "Product not found" })
            }
        })
})

const countProduct = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        
        res.send(` The Product in Stock is: ${productCount}`);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const productFeatured = (async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(count)
    if (!products) {
        res.status(404).json({ success: false })
    }
    res.send(products)


})
module.exports = { insert, findUser, findUserById, DeleteProduct, updateProduct, countProduct, productFeatured }