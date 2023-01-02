const Sequelize=require('sequelize');
const sequelize=new Sequelize(
    'expensetrackerapp',
    'root',
    'tharakiran',
    {
        dialect:'mysql',
        host:'localhost'
    }
);

module.exports=sequelize;