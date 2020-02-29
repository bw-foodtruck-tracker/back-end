module.exports = (role) => {
    return function(req,res,next) {
        if (req.decodedJwt.role && req.decodedJwt.role.includes('diner')) {
            next()
        } else {
            res.status(403).json({ message: "You do not have permission" }); 
        }
    }
}