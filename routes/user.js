const express = require('express');
const {getUser, PostUser, DeleteUser, getSingle, updateUser, login} = require('../controllers/usersCtl');
const userRouter = express.Router();

userRouter.get('/getUsers',getUser)
userRouter.get('/get/:id',getSingle)
userRouter.post('/register',PostUser)
userRouter.delete('/deleteUsers/:id',DeleteUser)
userRouter.put('/updateUsers/:id',updateUser)
userRouter.post('/login',login)



module.exports = userRouter