const sendErrorDev = (err, res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProd = (rr, res) =>{
    // Operational Error
    if(err.isOperational){
            res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }else{
        // Programming or another unkown error
        console.error('ERROR', err);

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
       sendErrorProd(err, res);
    }
}