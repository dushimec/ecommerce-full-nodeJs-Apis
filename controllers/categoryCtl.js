const Category = require("../models/category");

const AddCategory = (async (req,res) =>{
    let category = new Category(req.body)
    category = await category.save();

    if(!category){
        return res.status(404).send("The category not created")
    }
    res.send(category)
    
})
const GetCategory = (async(req,res) =>{
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(404).json({
            message:'There is no category Founded',
            success:false
        })
    }
    res.json(categoryList)
})

const DeleteCategory = ((req,res) =>{
    Category.findByIdAndRemove(req.params.id)
    .then(category =>{
        if(category){
            res.status(200).json({success:true, message:"category Deleted"})
        }else{
            res.status(404).json({success:false, message:"Category not found"})
        }
    })
})

const findCategory = ((req,res) =>{
    Category.findById(req.params.id)
    .then(findcategor =>{
        if(!findcategor){
            res.status(404).json({success:false, message:"Category not found"})
        }else{
            res.status(200).json(findcategor)
            
        }
    })
})
const updateCategory = ((req,res) =>{
    Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(updatecategory =>{
        if(!updatecategory){
            res.status(404).json({success:false, message:"Category Not Updated"})
        }else{
            res.status(200).json(updatecategory)
            
            
        }
    })
})
module.exports = {AddCategory,GetCategory,DeleteCategory,findCategory,updateCategory}