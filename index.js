const express= require('express');
const cors=require('cors');
const { todoRouter } = require('./routes/todo.routes');
const { userRouter } = require('./routes/user.routes');
const { connectdb } = require('./config/db.config');
const app=express();
const PORT=process.env.PORT ||8400;

app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.use('/user',userRouter);
app.use('/todos',todoRouter);

app.listen(PORT,async()=>{
    try{
        await connectdb;
        console.log(`connected to db successfully`)
    }catch(err){
        console.log('failed to connect to db ' + err)
    }
    
    console.log(`connected to ${PORT} successfully`)

})
