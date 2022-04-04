const express = require('express');
const morgan = require('morgan')
const { create } = require('domain');
const AppError = require('./utils/appError')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

// 1 MIDDLEWARES
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next()
})


app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*',(req, res, next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)

    // 4 START THE SERVER   
module.exports = app;
