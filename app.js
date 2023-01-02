const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');
const Expense=require('./models/expense');
const expenseroutes=require('./routes/expense');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(expenseroutes);

sequelize.sync().then(res=>{
    app.listen(4000);
}).catch(err=>{console.log(err)});
