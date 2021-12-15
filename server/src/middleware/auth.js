const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if(!token)
    res.json({success:false, message:'Access token not found'})
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userPhone = decode.phone
        next()
    } catch (error) {
        res.json({success: false, message:error.message})
    }
}

module.exports = verifyToken