module.exports = (role) => {
    return function(req,res,next) {
        if (req.decodedJwt.department && req.decodedJwt.department.includes('role')) {
            next()
        } else {
            res.status(403).json({ message: "You do not have permission" }); 
        }
    }
}