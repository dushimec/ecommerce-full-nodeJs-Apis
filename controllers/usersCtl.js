const Users = require("../models/users");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = (async (req, res) => {
    const user = await Users.find().select("-passwordHash")
    if (!user) {
        res.status(404).json({ success: false, message: "Not user found" })

    }
    res.send(user)
})
const getSingle = (async (req, res) => {
    const userId = await Users.findById(req.params.id).select("-passwordHash")
    if (!userId) {
        res.status(404).json({ success: false, message: "Not user found" })

    }
    res.send(userId)
})



const updateUser = (async (req, res) => {

    let userUpadate = new Users.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        category: req.body.category,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,

    })
    await userUpadate.save()
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch((err) => {
            res.status(404).json({ success: false, })
        })




})


const PostUser = (async (req, res) => {

    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        category: req.body.category,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,

    })
    await user.save()
        .then(posted => {
            res.status(200).json(posted)
        })
        .catch((err) => {
            res.status(404).json({ success: false, })
        })

})

const DeleteUser = ((req, res) => {
    Users.findByIdAndRemove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, message: "User Deleted" })
            } else {
                res.status(404).json({ success: false, message: "User not found" })
            }
        })
})

const login = (async (req, res) => {
    const user = await Users.findOne({ email: req.body.email })
    const secret = process.env.my_secret
    if (!user) {
        return res.status(400).send("User not found")
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }

        )
        res.status(200).send({ user: user.email, token: token })
       

    } else {
        res.status(400).json({ massage: "Password incorrect!!" })
    }

})

module.exports = { getUser, PostUser, DeleteUser, getSingle, updateUser, login }