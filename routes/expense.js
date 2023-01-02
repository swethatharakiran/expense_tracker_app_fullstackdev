const express=require('express');
const Router=express.Router();
const expensecontroller=require('../controllers/expense');

Router.get('/',expensecontroller.getform);
Router.post('/add-expense',expensecontroller.postform);
Router.get('/get-expenselist',expensecontroller.getexpenselist);
Router.get('/delete-expense/:id',expensecontroller.deleteexpense);
Router.get('/edit-expense/:id',expensecontroller.editexpense);

module.exports=Router;