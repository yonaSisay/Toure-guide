const AppError = require('../utils/appError')
const handleCastErrorDB = err =>{
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}
const handleDuplicateDB = err =>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)
    console.log(value)
    const message = `Duplicate field value:${value}, Please use another value`
    return new AppError(message, 400);
}

const sendErrorDev = (err, res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProd = (err, res) =>{
    // Operational Error
    if(err.isOperational){
            res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }else{
        // Programming or another unkown error

        res.status(500).json({
            status:'fail',
            message:"Something went very wrong!"
        })
    }
}

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development') {
       sendErrorDev(err, res);
    }else if(process.env.NODE_ENV === 'production'){
        let error = { ...err };
        if(err.name === 'CastError' ) err  = handleCastErrorDB(err);
        if(err.code === 11000) err = handleDuplicateDB(err);

       sendErrorProd(err, res);
    }
}