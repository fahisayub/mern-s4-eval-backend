const {Router}=require('express');
const { UserController } = require('../controllers/user.controllers');


let userRouter=Router();

userRouter.post('/signup',UserController.signup)
userRouter.post('/login',UserController.login)

module.exports={
    userRouter
}