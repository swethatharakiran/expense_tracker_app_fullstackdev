const Expense=require('../models/expense');

exports.getform=(req,res,next)=>{
    res.send('<h1>This is expense tracker form</h1>');
}

exports.postform=async(req,res,next)=>{
    console.log(req.body);
    await Expense.create({
        expenseamount:req.body.expenseamount,
        desc:req.body.desc,
        category:req.body.category})
        .then(result=>res.json(result.dataValues))
        .catch(err=>res.send(err));
    }


exports.getexpenselist=async(req,res,next)=>{
    try{
    const expense=await Expense.findAll();
    res.status(200).json({allexpense:expense});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }

}

exports.deleteexpense=async(req,res,next)=>{
    const id=req.params.id;
    try{
        await Expense.destroy({where:{id:id}});
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }

}

exports.editexpense=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const expense=await Expense.findByPk(id)
        .then(result=>res.json(result.dataValues));
        
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:err});
    }
}
