const {Router}=require('express');
const { TodoController } = require('../controllers/todo.controllers');
const { authentication } = require('../middlewares/authentincation.middleware');

let todoRouter=Router();

todoRouter.get('/',authentication,TodoController.getTodo);
todoRouter.post('/create',authentication,TodoController.addTodo);
todoRouter.put('/:id',authentication,TodoController.updateTodo);
todoRouter.delete('/:id',authentication,TodoController.deleteTodo);
todoRouter.get('/?q',authentication,TodoController.queryTodo);

module.exports={
    todoRouter
}