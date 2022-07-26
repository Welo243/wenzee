import express from 'express'; 
import mongoose from "mongoose"
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv'; 
import orderRouter from './routes/orderRouter.js';

dotenv.config();
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/zandos', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
});


app.use('/api/users',userRouter);

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
    
})

app.get('/', (req,res) =>{

    res.send("serverd is ready");
});

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
});


const port = process.env.PORT || 2000;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
});

