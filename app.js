const express = require('express');
const morgan = require('morgan')
const { create } = require('domain');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// 1 MIDDLEWARES
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log("hello from the middelware");
    next();
})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next()
})


app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);


    // 4 START THE SERVER   
 module.exports = app;
